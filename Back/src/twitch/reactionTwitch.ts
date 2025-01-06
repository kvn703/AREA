import { Injectable } from '@nestjs/common';
import { UserServiceEntity } from 'src/entity/userService.entity';
import axios, { Axios } from 'axios';

@Injectable()
export class ReactionTwitch {
  async createClip(userService: UserServiceEntity, arg: any) {
    const headers = {
      Authorization: `Bearer ${userService.token}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID,
    };
    await axios
      .post(
        'https://api.twitch.tv/helix/clips?broadcaster_id=' +
          arg.broadcaster_id,
        {},
        { headers: headers },
      )
      .then((response) => {
        console.log('Clip created');
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
}
