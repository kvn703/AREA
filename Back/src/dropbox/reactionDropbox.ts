import { Injectable } from '@nestjs/common';
import { UserServiceEntity } from 'src/entity/userService.entity';
import axios, { Axios } from 'axios';

@Injectable()
export class ReactionDropbox {
  async deleteFile(userService: UserServiceEntity, arg: any) {
    const headers = {
      Authorization: `Bearer ${userService.token}`,
      'Content-Type': 'application/json',
    };
    await axios
      .post(
        'https://api.dropboxapi.com/2/files/delete_v2',
        {
          path: arg.path,
        },
        { headers: headers },
      )
      .then((response) => {
        console.log('File deleted');
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  async copyFile(userService: UserServiceEntity, arg: any) {
    const headers = {
      Authorization: `Bearer ${userService.token}`,
      'Content-Type': 'application/json',
    };
    await axios
      .post(
        'https://api.dropboxapi.com/2/files/copy_v2',
        {
          from_path: arg.from_path,
          to_path: arg.to_path,
          autorename: true,
        },
        { headers: headers },
      )
      .then((response) => {
        console.log('File copied');
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
}
