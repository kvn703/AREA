import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Login } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

export class TokenAnswer {
  @ApiProperty()
  access_token: string;
}

export class Profile {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  email: string;
}

@Injectable()
export class AuthService {
  constructor(readonly jwtService: JwtService) {}

  async loginUser(LoginRequest: Login): Promise<TokenAnswer> {
    const { email, password } = LoginRequest;
    const user = await UserEntity.findOneBy({ email: email });
    if (user === null) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async registerUser(userData: User): Promise<TokenAnswer> {
    const userEntity: UserEntity = UserEntity.create();
    const { name, surname, email, password } = userData;
    userEntity.name = name;
    userEntity.surname = surname;
    userEntity.email = email;
    userEntity.password = await bcrypt.hash(password, 10);
    try {
      await UserEntity.save(userEntity);
    } catch (error) {
      throw new HttpException('Error saving user', HttpStatus.BAD_REQUEST);
    }
    const payload = { email: userEntity.email, sub: userEntity.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async profileUser(req: any): Promise<Profile> {
    const user = await UserEntity.findOneBy({ id: req.user.sub });
    if (user === null) throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    return { name: user.name, surname: user.surname, email: user.email };
  }
}
