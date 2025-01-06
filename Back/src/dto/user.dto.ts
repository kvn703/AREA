import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  surname: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
}

export class Login {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
}

export class GoogleUser {
  @IsNumber()
  id: number;
  @IsEmail()
  email: string;
  @IsBoolean()
  verified_email: boolean;
  @IsString()
  name: string;
  @IsString()
  given_name: string;
  @IsString()
  picture: string;
  @IsString()
  local: string;
}
