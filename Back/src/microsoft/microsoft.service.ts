import axios from 'axios';
import { config } from 'dotenv';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { ReactionMicrosoft } from './reactionMicrosoft';
import { ActionMicrosoft } from './actionMicrosoft';
import { JwtService } from '@nestjs/jwt';
import { ReactionEntity } from 'src/entity/reaction.entity';
import { AreaEntity } from 'src/entity/area.entity';
import { ReactionArray } from 'src/reaction/reaction.array';
import { QueryFailedError } from 'typeorm';

config();

const jwt = require('jsonwebtoken');

async function getmicrosoftToken(
  code: string,
): Promise<string | undefined | string[]> {
  try {
    const response = await axios.post(
      'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      `client_id=${process.env.Microsoft_CLIENT_ID}&client_secret=${process.env.Microsoft_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.DNS_NAME}:8080/api/auth/Microsoft/callback&grant_type=authorization_code`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting token microsoft');
    return undefined;
  }
}

async function getmicrosoftUserId(token: string): Promise<string | undefined> {
  try {
    const response = await axios.get('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.id;
  } catch (error) {
    return error;
  }
}

export class MicrosoftService {
  map: { [key: string]: number } = {
    push: 1,
  };

  constructor(
    private readonly reactionGithub: ReactionMicrosoft,
    private readonly actionmicrosoft: ActionMicrosoft,
    private readonly jwtService: JwtService,
    private readonly reactionArray: ReactionArray,
  ) {}

  async addService(request: any): Promise<void> {
    const email = request.query.state;
    const code = request.query.code;
    this.saveToken(email, code, 'microsoft');
  }

  private async saveToken(email: string, code: string, serviceName: string) {
    const user = await UserEntity.findOneBy({ email: email });
    const service = await ServiceEntity.findOneBy({ name: serviceName });
    if (user === null) {
      console.error('User not found (', email, ')');
      return;
    }
    if (service === null) {
      console.error('Service not found (', serviceName, ')');
      return;
    }

    const microsoftToken = await getmicrosoftToken(code);
    if (microsoftToken === undefined) {
      console.error('Error getting token microsoft');
      return;
    }
    const microsoftUserId = await getmicrosoftUserId(microsoftToken.toString());
    if (microsoftUserId === undefined) {
      console.error('Error getting user id microsoft');
      return;
    }

    const userService = UserServiceEntity.create();
    userService.user = user;
    userService.service = service;
    userService.serviceIdentifier = microsoftUserId;
    userService.token = microsoftToken.toString();

    try {
      console.log("save token Microsoft ...");
      await userService.save();
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('duplicate key value violates unique constraint')) {
        const existingEntity = await UserServiceEntity.findOne({
          where: {
            user: { id: user.id },
            service: { id: service.id },
          },
      });
      if (existingEntity) {
        existingEntity.token = microsoftToken.toString();
        try {
          console.log("update token Microsoft ...");
          await existingEntity.save();
        } catch (error) {
          console.error('Error updating token for user ', user.id, ' and service ', service.id);
          console.error(error);
        }
        return;
      }
    }
  }
  }

  async getUserService(serviceIdentifier: string): Promise<UserServiceEntity | null> {
    const userService = await UserServiceEntity.findOneBy({ serviceIdentifier: serviceIdentifier });
    if (userService === null) {
      console.error("User not found (", serviceIdentifier, ")");
      return null;
    }
    return userService;
  }

  async getArea(userService: UserServiceEntity): Promise<AreaEntity[] | null> {
    const area = await AreaEntity.find({
      where: {
        user: {id: userService.userId }
      }
    });

    if (area === null) {
      console.error("Area not found (", userService, event, ")");
      return null;
    }

    const areaFound : AreaEntity[] = [];
    for (const element of area) {
      areaFound.push(element);
    }
    return areaFound;
  }

  async getReactionService(serviceId: number): Promise<ReactionEntity | null> {
    const reactionService = await ReactionEntity.findOneBy({ id: serviceId });
    if (reactionService === null) {
      console.error("Reaction not found (", serviceId, ")");
      return null;
    }
    return reactionService;
  }

  async webhookHandling(req: any): Promise<void> {
    try {
      const get = req.body.value[0].resource;
    } catch (e) {
      // not a message
      return;
    }    
    const match = req.body.value[0].resource.match(/Users\/([^\/]+)\/Messages/);
    if (match === null) {
      console.error("Error getting user id microsoft");
      return;
    }
    const userService = await this.getUserService(match[1]);
    if (userService == null) {
      console.error("User not found (", req.body.sender, ")");
      return;
    }
    const area = await this.getArea(userService);
    if (area === null || area.length === 0) {
      console.error("Area not found (", userService, req.headers['x-github-event'], ")");
      return;
    }

    for (const element of area) {
      const serviceEntity = await this.getReactionService(element.reactionId);
      if (serviceEntity === null) {
        console.error("Reaction not found (", element.reactionId, ")");
        return;
      }
      const userServiceReaction = await UserServiceEntity.find({ where: { user: { id: userService.userId }, service: { id: serviceEntity.serviceId } } });
      if (userServiceReaction === null) {
        console.error("User not found (", userService, ")");
        return;
      }
      this.reactionArray.map[element.reactionId](userServiceReaction[0], element.args_reaction);
    }
  }

}
