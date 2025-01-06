import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { config } from 'dotenv';
import { QueryFailedError } from 'typeorm';
import axios from 'axios';

config();

@Injectable()
export class GitlabService {

    async getGitlabToken(code : string) : Promise<any | undefined> {
        const client_id = process.env.GITLAB_CLIENT_ID
        const client_secret = process.env.GITLAB_CLIENT_SECRET
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/gitlab/callback`

        const gitlabToken = await axios.post('https://gitlab.com/oauth/token', {
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: redirect_uri,
            code: code,
            grant_type: 'authorization_code',
        })
        .then((res) => res.data)
        .catch(function (error) {
            console.log("error gitlab get access token: ", error);
        });
        return gitlabToken;
    }

    async getUserInfo(accesstoken: string) {
        const userInfo = await axios.get('https://gitlab.com/api/v4/user', {
            headers: {
                'authorization': 'Bearer ' + accesstoken,
                'X-GitHub-Api-Version': '2022-11-28',
            }
        })
        .then((res) => res.data)
        .catch(function (error) {
            console.log("error gitlab get user info: ", error);
        });
        return userInfo;
    }

    async saveToken(email: string, token: string, serviceIdentifier: string, serviceName: string) {
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

        const userService = new UserServiceEntity();
        userService.user = user;
        userService.service = service;
        userService.token = token;
        userService.serviceIdentifier = serviceIdentifier;

        try {
            console.log("save token GitLab ...");
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
                console.log("update token GitLab ...");
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
        console.log("addService Gitlab");
        const userEmail = req.query.state
        const code = req.query.code

        if (code === undefined) {
            console.error("Error getting code");
            return;
        }

        const gitlabAccesstoken = await this.getGitlabToken(code);

        if (gitlabAccesstoken === undefined) {
            console.error("Error getting gitlab access token");
            return;
        }

        const accessToken = gitlabAccesstoken.access_token;
        const infoUser = await this.getUserInfo(accessToken);

        if (infoUser === undefined) {
            console.error("Error getting user info");
            return;
        }

        const serviceIdentifier = infoUser.name;
        this.saveToken(userEmail, accessToken, serviceIdentifier, "gitlab");
    }
}
