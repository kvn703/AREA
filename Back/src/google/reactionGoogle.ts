import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserServiceEntity } from 'src/entity/userService.entity';

@Injectable()
export class ReactionGoogle {
    async createSheet(userService: UserServiceEntity, arg: any) {
        const url = 'https://sheets.googleapis.com/v4/spreadsheets';
        const requestBody = {
            properties: {
                title: arg.title
            }
        };

        try {
            const response = await axios.post(url, requestBody, {
                headers: {
                    Authorization: `Bearer ${userService.token}`
                }
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    async sendEmail(userService: UserServiceEntity, arg: any) {
        const url = 'https://www.googleapis.com/gmail/v1/users/me/messages/send';
        const to = arg.to;
        const subject = arg.subject;
        const body = arg.body;

        const requestBody = {
          raw: Buffer.from(
            `From:${userService.serviceIdentifier}\r\n` +
            `To: ${to}\r\n` +
            `Subject: ${subject}\r\n\r\n` +
    
            `${body}`
          ).toString('base64')
        };
        console.log(userService.serviceIdentifier)
        try {
          const response = await axios.post(url, requestBody, {
            headers: {
              Authorization: `Bearer ${userService.token}`,
              'Content-Type': 'application/json'
            }
          });
          return response;
        } catch (error) {
            console.log(error);
        }
      }
}
