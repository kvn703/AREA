import { Injectable } from '@nestjs/common';
import { UserServiceEntity } from 'src/entity/userService.entity';
import axios from 'axios';

@Injectable()
export class ReactionFigma {
    async addComment(userService: UserServiceEntity, arg: any) {
        console.log("Add comment in figma page ...")

        await axios.post('https://api.figma.com/v1/files/' + arg.file_key + '/comments',
        { message: arg.comment },
        {
            headers: {
                'authorization': 'Bearer ' + userService.token,
                'X-FIGMA-TOKEN': userService.token,
            }
        })
        .then((res) => res.data)
        .catch(function (error) {
            console.log("error figma add comment: ", error);
        });
    }
}
