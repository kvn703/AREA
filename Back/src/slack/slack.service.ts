import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { QueryFailedError } from 'typeorm';
import axios from 'axios';

config();

@Injectable()
export class SlackService {

    async getSlackToken(code : string) : Promise<any | undefined> {
        const client_id = process.env.SLACK_CLIENT_ID
        const client_secret = process.env.SLACK_CLIENT_SECRET
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/slack/callback`

        console.log("client_id: ", client_id);
        console.log("client_secret: ", client_secret);
        console.log("redirect_uri: ", redirect_uri);
        console.log("code: ", code);

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
          };

        const body = {
            client_id: client_id,
            client_secret: client_secret,
            code: code,
            redirect_uri: redirect_uri,
        }

        const response = await axios.post('https://slack.com/api/oauth.v2.access', body, { headers: headers })
        .then((res) => res.data)
        .catch((err) => {
            console.log("Error getting Slack token: ", err);
        });

        return response;
    }

    async getUserInfo(accesstoken: string) {
        const headers = {
            contentType: 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + accesstoken,
        }

        const userInfo = await axios.get('https://slack.com/api/users.profile.get', { headers: headers })
        .then((res) => res.data)
        .catch(function (error) {
            console.log("error slack get user info: ", error);
        });

        return userInfo;
    }

    async saveToken(email: string, token: string, serviceIdentifier: string, serviceName: string) {
        const user = await UserEntity.findOne({ where: { email: email } });
        const service = await ServiceEntity.findOne({ where: { name: serviceName } });

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
            console.log("save token Slack ...");
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
                console.log("update token Slack ...");
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
        console.log("addService");
        const userEmail = req.query.state;
        const code = req.query.code;
        if (userEmail === undefined) {
            console.log("Error getting user email");
            return;
        }

        if (code === undefined) {
            console.log("Error getting code");
            return;
        }

        const slackAccessToken = await this.getSlackToken(code);

        if (slackAccessToken === undefined) {
            console.log("Error getting Slack token");
            return;
        }

        const accessToken = slackAccessToken.authed_user.access_token;
        const infoUser = await this.getUserInfo(accessToken);

        if (infoUser.ok === false) {
            console.log("Error getting user info");
            return;
        }
        const serviceIdentifier = infoUser.profile.real_name;
        this.saveToken(userEmail, accessToken, serviceIdentifier, "slack");
    }
}
