import { Injectable } from '@nestjs/common';
import { UserServiceEntity } from 'src/entity/userService.entity';
import axios from 'axios';
import { Type } from 'class-transformer';

@Injectable()
export class ReactionSlack{
  async sendMessage(userService: UserServiceEntity, arg: any) {
    const headers = {
      "Content-Type": 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${userService.token}`,
    };
    await axios
      .post(
        'https://slack.com/api/chat.postMessage?channel=' + arg.channel + '&text=' + arg.text,
        {},
        { headers: headers },
      )
      .then((response) => {
        if (response.data.ok) console.log("Message sent");
        else console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  async leaveChannel(userService: UserServiceEntity, arg: any) {
    const headers = {
      "Content-Type": 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${userService.token}`,
    };
    await axios
      .post(
        'https://slack.com/api/conversations.leave?channel=' + arg.channel,
        {},
        { headers: headers },
      )
      .then((response) => {
        if (response.data.ok) console.log("Channel left");
        else console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  async renameChannel(userService: UserServiceEntity, arg: any) {
    const headers = {
      "Content-Type": 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${userService.token}`,
    };
    await axios
      .post(
        'https://slack.com/api/conversations.rename?channel=' + arg.channel + '&name=' + arg.name,
        {},
        { headers: headers },
      )
      .then((response) => {
        if (response.data.ok) console.log("Channel renamed");
        else console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
}
