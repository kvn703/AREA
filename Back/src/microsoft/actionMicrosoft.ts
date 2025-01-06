import { Injectable } from '@nestjs/common';
import { UserServiceEntity } from 'src/entity/userService.entity';
import axios from 'axios';

@Injectable()
export class ActionMicrosoft {
  async onReceiveMail(userService: UserServiceEntity, arg: any) {
    const access_token = userService.token;
    const url = 'https://graph.microsoft.com/v1.0/subscriptions';
    const subscription = {
      changeType: 'created',
      notificationUrl: 'http://localhost:8080/api/Webhook/Microsoft',
      lifecycleNotificationUrl: 'http://localhost:8080/api/Webhook/Microsoft',
      resource: "/me/mailfolders('inbox')/messages",
      expirationDateTime: '2023-10-26T11:00:00.0000000Z',
      clientState: 'SecretClientState',
    };
    await axios
      .post(url, subscription, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Événement créé avec succès:', response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la création de l'action on CreateMail:",
          error.response.data,
        );
      });
  }
}
