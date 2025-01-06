import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class InstagramService {

    async getInfoUser(accessToken: string | string[] | undefined) : Promise<any> {

      const infoUser = await axios.get(
        `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`
      ).then((res) => res.data)
      .catch((error) => {
        console.log("error get info user instagram: ", error);
      });

      return infoUser;
    }

    async saveToken(email: string, token: string, serviceName: string) {
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

        const infoUser = await this.getInfoUser(token);

        if (infoUser === undefined) {
          console.error("Error getting info user");
          return;
        }

        const userService = UserServiceEntity.create();
        userService.user = user;
        userService.service = service;
        userService.serviceIdentifier = infoUser.username;
        userService.token = token;

        try {
          console.log("save token Instagram ...");
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
              console.log("update token Instagram ...");
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

    async getInstagramToken({ code }: { code: string }): Promise<string | undefined> {

        const data = {
            client_id: // your client id,
            client_secret: // your client secret,
            grant_type: 'authorization_code',
            redirect_uri: `${process.env.DNS_NAME}:8080/api/auth/instagram/callback`,
            code: code
          };

          const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          };

        let instagramToken: string = "";

        await axios.post('https://api.instagram.com/oauth/access_token', new URLSearchParams(data), config)
          .then(response => {
            instagramToken = response.data.access_token;
          })
          .catch(error => {
            console.error('Erreur de la requête :', error);
          });

        if (instagramToken === undefined) {
            console.error("Error getting instagram token");
            return;
        }
        return instagramToken;
    }

    async addService(req: any) {
        const userEmail = req.query.state;
        const code = req.query.code;
        const instagramAccesstoken = await this.getInstagramToken({ code: code });

        if (instagramAccesstoken === undefined) {
            console.error("Error getting token");
            return;
        }

        this.saveToken(userEmail, instagramAccesstoken.toString(), "instagram");
    }
}
