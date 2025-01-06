import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import axios from 'axios';

config();

@Injectable()
export class MediumService {

    async getUserInfo() {
        const headers = {
            Authorization: `Bearer ${process.env.MEDIUM_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
        };

        const userInfo = await axios.get('https://api.medium.com/v1/me', { headers: headers })
            .then((res) => res.data)
            .catch((error) => {
                console.log(error.response.data);
            });

        return userInfo;
    }

    async saveToken(email: string, token: string, serviceIdentifier: string, serviceName: string) {
        const user = await UserEntity.findOne({ where: { email: email } });
        const service = await ServiceEntity.findOne({ where: { name: serviceName } });

        if (user === null) {
            console.log("Error getting user");
            return;
        }

        if (service === null) {
            console.log("Error getting service");
            return;
        }

        const userService = new UserServiceEntity();
        userService.user = user;
        userService.service = service;
        userService.token = token;
        userService.serviceIdentifier = serviceIdentifier;

        try {
            console.log("Saving Medium token ...");
            await userService.save();
        } catch (error) {
            console.log("Error saving user service: ", error);
        }
    }

    async addService(req: any) {
        console.log("addService Medium");
        const userEmail = req.user.email

        if (userEmail === undefined) {
            console.log("Error getting user email");
            return;
        }

        const infoUser = await this.getUserInfo();

        if (infoUser === undefined) {
            console.log("Error getting user info");
            return;
        }

        if (process.env.MEDIUM_TOKEN === undefined) {
            console.log("Error getting Medium token");
            return;
        }

        const serviceIdentifier = infoUser.data.id;
        this.saveToken(userEmail, process.env.MEDIUM_TOKEN, serviceIdentifier, 'medium');
    }
}
