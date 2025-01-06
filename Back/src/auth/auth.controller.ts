import {
  Body,
  Post,
  Controller,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService, TokenAnswer, Profile } from './auth.service';
import { Login } from '../dto/user.dto';
import { User } from '../dto/user.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({ type: TokenAnswer })
  async loginUser(@Body() body: Login): Promise<TokenAnswer> {
    const result = await this.authService.loginUser(body);
    return result;
  }

  @Post('register')
  @ApiCreatedResponse({ type: TokenAnswer })
  async registerUser(@Body() body: User): Promise<TokenAnswer> {
    const result = await this.authService.registerUser(body);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Profile })
  getProfile(@Request() req: Request): Promise<Profile> {
    return this.authService.profileUser(req);
  }
}
