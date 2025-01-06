import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleGuard } from './google.guard';
import { Response } from 'express';
import { ApiExcludeEndpoint, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AuthGuard } from 'src/auth/auth.guard';

config();

@Controller('api/auth')
export class GoogleController {
  constructor(
    private readonly googleService: GoogleService,
    private readonly googleGuard: GoogleGuard,
  ) {}

  @ApiOkResponse({
    description: 'Endpoint to redirect to google authentification',
  })
  @ApiBearerAuth()
  @Get('google')
  @UseGuards(AuthGuard)
  async googleAddService(@Req() req: any) {
    await this.googleGuard.addService(req, req.res);
  }

  @ApiOkResponse({
    description: 'Endpoint to redirect to google authentification to register a new user',
  })
  @Get('google/Register')
  @UseGuards(GoogleGuard)
  async googleAuth(@Req() req: any) {}

  @ApiExcludeEndpoint()
  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    if (req.query.state === undefined) {
      const userToken = await this.googleService.registerGoogleUser(req.user);

      await this.googleService.saveToken(req);
      res.redirect(
        `${process.env.DNS_NAME}:8081/auth/succes?token=${userToken.access_token}`,
      );
    } else {
      const token = await this.googleService.saveToken(req);
      res.redirect(`${process.env.DNS_NAME}:8081/auth/succes?token=${token}`);
    }
    return;
  }
}
