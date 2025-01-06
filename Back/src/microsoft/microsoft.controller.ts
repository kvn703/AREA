import { Controller, Get, Req, Res, UseGuards, Post } from '@nestjs/common';
import { Response } from 'express';
import { config } from 'dotenv';
import { AuthGuard } from 'src/auth/auth.guard';
import { MicrosoftService } from './microsoft.service';
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

config();

const tenant_id = 'common';

@Controller('api')
export class MicrosoftController {
  constructor(private readonly MicrosoftService: MicrosoftService) {}

  @ApiOkResponse({
    description: 'Endpoint to redirect to Microsoft authentification',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('auth/Microsoft')
  async MicrosoftAuth(@Req() req: any, @Res() res: Response) {
    const redirect_url = `${process.env.DNS_NAME}:8080/api/auth/Microsoft/callback`;
    res.redirect(
      `https://login.microsoftonline.com/${tenant_id}/oauth2/v2.0/authorize?client_id=${process.env.Microsoft_CLIENT_ID}&response_type=code&redirect_uri=${redirect_url}&response_mode=query&scope=Calendars.ReadWrite User.Read Mail.ReadWrite&state=${req.user.email}`,
    );
  }

  @ApiExcludeEndpoint()
  @Get('auth/Microsoft/callback')
  async MicrosoftAuthCallback(@Req() req: any, @Res() res: Response) {
    this.MicrosoftService.addService(req);
    res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
  }

  @ApiExcludeEndpoint()
  @Post("Webhook/Microsoft")
  async MicrosoftWebhook(@Req() req: any, @Res() res: Response) {
    console.log('MicrosoftWebhook:', req.body);
    this.MicrosoftService.webhookHandling(req);
    res.status(200).send(req.query.validationToken);
  }
}
