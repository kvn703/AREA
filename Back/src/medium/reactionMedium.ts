import { Injectable } from '@nestjs/common';
import { UserServiceEntity } from 'src/entity/userService.entity';
import axios from 'axios';
import { config } from 'dotenv';
import { MediumService } from './medium.service';

config();

@Injectable()
export class ReactionMedium {

    async createPost(userService: UserServiceEntity, arg: any) {
        console.log("Creating post ...");

        const headers = {
            Authorization: `Bearer ${userService.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
        };

        const data = {
            title: arg.title,
            contentFormat: "markdown",
            content: arg.content,
        };

        await axios.post('https://api.medium.com/v1/users/' + userService.serviceIdentifier + '/posts', data, { headers: headers })
            .then((response) => {
                console.log("Post created");
            })
            .catch((error) => {
                console.log("error medium post creation: ", error.response.data);
        });
    }
}
