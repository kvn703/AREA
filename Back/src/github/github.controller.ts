import { Controller, Get, Req, Res, UseGuards, Post } from '@nestjs/common';
import { Response } from 'express';
import { GitHubService } from './github.service';
import { config } from 'dotenv';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

config();

@Controller('api')
export class GitHubController {
  constructor(private readonly gitHubService: GitHubService) {}

  @ApiOkResponse({
    description: 'Endpoint to redirect to github authentification',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('auth/GitHub')
  async GitHubAuth(@Req() req: any, @Res() res: Response) {
    const redirect_url = `${process.env.DNS_NAME}:8080/api/auth/GitHub/callback`
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${redirect_url}&scope=repo,read:user,read:org&state=${req.user.email}`,
    );
  }

  @ApiExcludeEndpoint()
  @Get('auth/GitHub/callback')
  async GitHubAuthCallback(@Req() req: any, @Res() res: Response) {
    this.gitHubService.addService(req);
    res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
  }

  @ApiExcludeEndpoint()
  @Post('Webhook/GitHub')
  async GitHubWebhook(@Req() req: any, @Res() res: Response) {
    console.log('Webhook GitHub recoi quelque chose: ', req.headers['x-github-event']);
    this.gitHubService.webhookHandling(req);
    res.send(req.user);
  }
}
