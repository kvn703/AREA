import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { QueryFailedError } from 'typeorm';
import axios from 'axios';

@Injectable()
export class TwitchService {

    async getTwitchToken(code : string) : Promise<any | undefined> {
        const client_id = process.env.TWITCH_CLIENT_ID;
        const client_secret = process.env.TWITCH_CLIENT_SECRET;
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/twitch/callback`;

        const headers = {
            contentType: 'application/json',
        }

        const body = {
            client_id: client_id,
            client_secret: client_secret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirect_uri,
        }

        const token = await axios.post('https://id.twitch.tv/oauth2/token', body, { headers: headers });
        return token.data;
    }

    async getUserInfo(accesstoken: string) {
        const headers = {
            contentType: 'application/json',
            Authorization: 'Bearer ' + accesstoken,
            'Client-Id': process.env.TWITCH_CLIENT_ID,
        }

        const userInfo = await axios.get('https://api.twitch.tv/helix/users', { headers: headers })
        .then((res) => res.data)
        .catch(function (error) {
            console.log("error twitch get user info: ", error);
        });
        return userInfo.data;
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
            console.log("save token Twitch ...");
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
                console.log("update token Twitch ...");
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
        console.log("twitchService");
        const userEmail = req.query.state;
        const code = req.query.code;

        if (code === undefined || userEmail === undefined) {
            console.error("Error getting code or userEmail");
            return;
        }

        const twitchAccesstoken = await this.getTwitchToken(code);

        if (twitchAccesstoken === undefined) {
            console.error("Error getting token");
            return;
        }

        const accessToken = twitchAccesstoken.access_token;
        const infoUser = await this.getUserInfo(accessToken);

        if (infoUser === undefined || infoUser.length === 0 || infoUser[0].login === undefined) {
            console.error("Error getting user info");
            return;
        }

        const serviceIdentifier = infoUser[0].login
        this.saveToken(userEmail, accessToken, serviceIdentifier, "twitch");
    }
}
