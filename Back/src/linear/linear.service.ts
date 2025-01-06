import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { LinearClient } from '@linear/sdk';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { QueryFailedError } from 'typeorm';
import axios from 'axios';

@Injectable()
export class LinearService {

    async getLinearToken(code : string) : Promise<any | undefined> {
        const client_id = process.env.LINEAR_CLIENT_ID
        const client_secret = process.env.LINEAR_CLIENT_SECRET
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/linear/callback`

        if (client_id === undefined) {
            console.error("Error getting linear client id");
            return;
        }

        if (client_secret === undefined) {
            console.error("Error getting linear client secret");
            return;
        }

        const url = 'https://api.linear.app/oauth/token';

        const data = new URLSearchParams();
        data.append('client_id', client_id);
        data.append('client_secret', client_secret);
        data.append('redirect_uri', redirect_uri);
        data.append('code', code);
        data.append('grant_type', 'authorization_code');

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
        const token = await axios
          .post(url, data.toString(), config)
          .then((res) => res.data)
          .catch((error) => {
            console.error("error getting linear access token: ", error);
        });
        return token;
    }

    async getUserInfo(accessToken: string) {
        const client = new LinearClient({ accessToken: accessToken })
        const userInfo = await client.viewer
        return userInfo;
    }

    async saveToken(email: string, token: string, serviceIdentifier: string, serviceName: string) {
        const user = await UserEntity.findOneBy({ email: email });
        const service = await ServiceEntity.findOneBy({ name: serviceName });

        if (user === null) {
          console.error("User not found (", email, ")");
          return;
        }

        if (service === null) {
          console.error("Service not found (", serviceName, ")");
          return;
        }

        const userService = UserServiceEntity.create();
        userService.user = user;
        userService.service = service;
        userService.serviceIdentifier = serviceIdentifier;
        userService.token = token;

        try {
          console.log("save token Linear ...");
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
              console.log("update token Linear ...");
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

    async addService(req: any) {
        console.log("addService Linear");
        const userEmail = req.query.state
        const code = req.query.code
        const linearAccesstoken = await this.getLinearToken(code);
        const accessToken = linearAccesstoken.access_token;

        if (accessToken === undefined) {
            console.error("Error getting linear access token");
            return;
        }

        const userInfo = await this.getUserInfo(accessToken);

        if (userInfo === undefined) {
            console.error("Error getting linear user info");
            return;
        }
        const serviceIdentifier = userInfo.email;
        this.saveToken(userEmail, accessToken, serviceIdentifier, "linear");
    }
}
