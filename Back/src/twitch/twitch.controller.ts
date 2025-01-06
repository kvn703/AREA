import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { TwitchService } from './twitch.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { config } from 'dotenv';
import { ApiExcludeEndpoint, ApiBearerAuth } from '@nestjs/swagger';

config();

@Controller('api')
export class TwitchController {
    constructor(private readonly twitchService: TwitchService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('auth/twitch')
    async twitchAuth(@Req() req: any, @Res() res: Response) {
        console.log("twitchAuth");
        const client_id= process.env.TWITCH_CLIENT_ID
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/twitch/callback`
        const response_type = 'code'
        const scope = 'user:read:email chat:edit clips:edit'

        res.redirect('https://id.twitch.tv/oauth2/authorize' +
        '?response_type='+ response_type + '&client_id=' + client_id +
        '&redirect_uri=' + redirect_uri + '&scope=' + scope + '&state=' + req.user.email)
    }

    @ApiExcludeEndpoint()
    @Get('auth/twitch/callback')
    async twitchAuthCallback(@Req() req: any, @Res() res: Response) {
        this.twitchService.addService(req);
        res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
    }
}
