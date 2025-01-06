import { GoogleUser } from 'src/dto/user.dto';
import { UserEntity } from 'src/entity/user.entity';
import { AuthService, TokenAnswer } from 'src/auth/auth.service';
import { Injectable, HttpException, HttpStatus, Req } from '@nestjs/common';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';

type CustomRequest = Request & { user: GoogleUser, tokens: Token };

type Token = {
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    id_token: string;
    expiry_date: number;
}


@Injectable()
export class GoogleService {
    constructor(private readonly authService: AuthService) {}

    async registerGoogleUser(googleUserData: GoogleUser): Promise<TokenAnswer> {
        const findUser = await UserEntity.findOneBy({ email: googleUserData.email });
        if (findUser === null) {
          const newUser = {name: googleUserData.name, surname: 'undefined', email: googleUserData.email, password: 'CHANGEIT'};
          await this.authService.registerUser(newUser);
        }
        const user = await UserEntity.findOneBy({ email: googleUserData.email });
        if (user === null) {
          throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
        const payload = { email: googleUserData.email, sub: user.id };
        return {
          access_token: await this.authService.jwtService.signAsync(payload),
        };
    }

    async  saveToken(request: any) {
      let user;
      if (request.query.state !== undefined) {
        const email = request.query.state.split('____')[1];
        user = await UserEntity.findOneBy({ email: email });
      } else {
        user = await UserEntity.findOneBy({ email: request.user.email });
      }
      const service = await ServiceEntity.findOneBy({ name: 'google' });
      if (user === null) {
        console.log("User not found");
        return;
      }
      if (service === null) {
        console.log("Service not found");
        return;
      }
      const userService = UserServiceEntity.create();
      userService.user = user;
      userService.service = service;
      userService.serviceIdentifier =  request.user.email;
      userService.token = request.tokens.access_token;
      try {
        await userService.save();
        return request.query.state.split('____')[0];
      } catch (error) {
        return;
      }
    }
}
