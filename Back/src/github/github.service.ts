import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as querystring from 'querystring';
import { config } from 'dotenv';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { Octokit } from '@octokit/rest';
import { AreaEntity } from 'src/entity/area.entity';
import { ReactionEntity } from 'src/entity/reaction.entity';
import { ReactionArray } from 'src/reaction/reaction.array';
import { QueryFailedError, getRepository } from 'typeorm';

config();

const jwt = require('jsonwebtoken');

async function getGitHubToken({
  code,
}: {
  code: string;
}): Promise<string | string[] | undefined> {
  const githubToken = await axios
    .post(
      `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
  const decoded = querystring.parse(githubToken);
  const accessToken = decoded.access_token;
  return accessToken;
}

@Injectable()
export class GitHubService {
  map: { [key: string]: number } = {
    push: 1,
    pull_requestopened: 2,
    pull_requestclosed: 8,
    issuesopened: 3,
    issuesclosed: 7,
    create: 4,
    delete: 6,
    starcreated: 9,
    issue_commentcreated: 10,
    memberadded: 11,
  };

  constructor(
    private readonly reactionArray: ReactionArray,
  ) {}

  async getInfoUser(accessToken: string | string[] | undefined) {
    const octokit = new Octokit({
      auth: accessToken,
    });

    const info = await octokit
      .request('GET /user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
      .then((res: any) => {
        return res.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
    return info;
  }

  async addService(request: any): Promise<void> {
    const userMail = request.query.state;
    const code = request.query.code;
    const GitHubAccesstoken = await getGitHubToken({ code: code });
    if (GitHubAccesstoken === undefined) {
      console.error('Error getting token');
      return;
    }
    this.saveToken(userMail, GitHubAccesstoken.toString(), 'github');
  }

  async saveToken(email: string, token: string, serviceName: string) {
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

    const infoUser = await this.getInfoUser(token);

    const userService = UserServiceEntity.create();
    userService.user = user;
    userService.service = service;
    userService.serviceIdentifier = infoUser.login;
    userService.token = token;

    try {
      console.log('save token Github ...');
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
          existingEntity.token = token
          try {
            console.log("update token Github ...");
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

  async getUserService(
    serviceIdentifier: string,
  ): Promise<UserServiceEntity | null> {
    const userService = await UserServiceEntity.findOneBy({
      serviceIdentifier: serviceIdentifier,
    });
    if (userService === null) {
      console.error('User not found (', serviceIdentifier, ')');
      return null;
    }
    return userService;
  }

  async getArea(
    userService: UserServiceEntity,
    event: string,
    repo: string,
  ): Promise<AreaEntity[] | null> {
    if (this.map[event] === undefined) {
      console.error('Event not found (', event, ')');
      return null;
    }
    const area = await AreaEntity.find({
      where: {
        user: { id: userService.userId },
        action: { id: this.map[event] },
      },
    });

    if (area === null) {
      console.error('Area not found (', userService, event, ')');
      return null;
    }

    const areaFound: AreaEntity[] = [];
    for (const element of area) {
      const args_action = JSON.parse(JSON.stringify(element.args_action));
      if (args_action.repo === repo) areaFound.push(element);
    }
    return areaFound;
  }

  async getReactionService(serviceId: number): Promise<ReactionEntity | null> {
    const reactionService = await ReactionEntity.findOneBy({ id: serviceId });
    if (reactionService === null) {
      console.error('Reaction not found (', serviceId, ')');
      return null;
    }
    return reactionService;
  }

  async webhookHandling(req: any): Promise<void> {
    const userService = await this.getUserService(req.body.sender.login);
    if (userService == null) {
      console.error('User not found (', req.body.sender, ')');
      return;
    }
    if (req.headers['x-github-event'] === 'ping') {
      console.log('Ping received from github');
      return;
    }
    const area = await this.getArea(
      userService,
      req.body.action !== undefined ? req.headers['x-github-event'] + req.body.action : req.headers['x-github-event'],
      req.body.repository.name,
    );
    if (area === null || area.length === 0) {
      console.error(
        'Area not found (',
        userService,
        req.headers['x-github-event'],
        ')',
      );
      return;
    }

    for (const element of area) {
      const serviceEntity = await this.getReactionService(element.reactionId);
      if (serviceEntity === null) {
        console.error('Reaction not found (', element.reactionId, ')');
        return;
      }
      const userServiceReaction = await UserServiceEntity.find({
        where: {
          user: { id: userService.userId },
          service: { id: serviceEntity.serviceId },
        },
      });
      if (userServiceReaction === null) {
        console.error('User not found (', userService, ')');
        return;
      }
      this.reactionArray.map[element.reactionId](
        userServiceReaction[0],
        element.args_reaction,
      );
    }
  }
}
