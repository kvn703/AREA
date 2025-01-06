import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { QueryFailedError } from 'typeorm';
import axios from 'axios';
import { userInfo } from 'os';

config();

@Injectable()
export class DropboxService {

    async getDropboxInfo(code : string) : Promise<any[] | undefined> {
        try {
            const response = await axios.post('https://api.dropboxapi.com/oauth2/token', null, {
              params: {
                code,
                grant_type: 'authorization_code',
                client_id: `${process.env.DROPBOX_CLIENT_ID}`,
                client_secret: `${process.env.DROPBOX_CLIENT_SECRET}`,
                redirect_uri: `${process.env.DNS_NAME}:8080/api/auth/dropbox/callback`, 
              },
            })
            return [response.data.access_token, response.data.account_id];
        }
        catch (error) {
            console.error("error getting dropbox access token: ", error);
        }
        return undefined;
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
          console.log("save token Dropbox ...");
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
              console.log("update token Dropbox ...");
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
      console.log("addService Dropbox");
      try {
          const userEmail = req.query.state;
          const code = req.query.code;
          const UserInfo = await this.getDropboxInfo(code);
          if (UserInfo === undefined) {
              console.error("Error getting Dropbox access token");
              return;
          }
          const accessToken = UserInfo[0];
  
          if (accessToken === undefined || UserInfo.length != 2)  {
              console.error("Error getting Dropbox access token");
              return;
          }
  
          const serviceIdentifier = UserInfo[1];
          this.saveToken(userEmail, accessToken, serviceIdentifier, "dropbox");
      } catch (error) {
          console.error("Error adding Dropbox service: ", error);
      }
    }
}

