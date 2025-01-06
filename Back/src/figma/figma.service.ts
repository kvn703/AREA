import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { config } from 'dotenv';
import { QueryFailedError } from 'typeorm';
import axios from 'axios';

config();

@Injectable()
export class FigmaService {

    async getFigmaToken(code : string) : Promise<any | undefined> {
        const client_id = process.env.FIGMA_CLIENT_ID
        const client_secret = process.env.FIGMA_CLIENT_SECRET
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/figma/callback`

        const figmaToken = await axios.post('https://www.figma.com/api/oauth/token', {
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: redirect_uri,
            code: code,
            grant_type: 'authorization_code',
        })
        .then((res) => res.data)
        .catch(function (error) {
            console.log("error figma get access token: ", error);
        });
        return figmaToken;
    }

    async getUserInfo(accesstoken: string) {
        const userInfo = await axios.get('https://api.figma.com/v1/me', {
            headers: {
                'authorization': 'Bearer ' + accesstoken,
                'X-FIGMA-TOKEN': accesstoken,
            }
        })
        .then((res) => res.data)
        .catch(function (error) {
            console.log("error figma get user info: ", error);
        });
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
            console.log("save token Figma ...");
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
                console.log("update token Figma ...");
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
        console.log("addService Figma");
        const userEmail = req.query.state
        const code = req.query.code

        if (code === undefined) {
            console.error("Error getting code");
            return;
        }

        const figmaAccesstoken = await this.getFigmaToken(code);

        if (figmaAccesstoken === undefined) {
            console.error("Error getting figma access token");
            return;
        }

        const accesToken = figmaAccesstoken.access_token;
        const userInfo = await this.getUserInfo(accesToken);

        if (userInfo === undefined) {
            console.error("Error getting user info");
            return;
        }
        const serviceIdentifier = userInfo.email;
        this.saveToken(userEmail, accesToken, serviceIdentifier, "figma");
    }
}
