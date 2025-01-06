import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { InstagramService } from './instagram.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOkResponse } from '@nestjs/swagger';

@Controller('api')
export class InstagramController {
    constructor(private readonly instagramService: InstagramService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('auth/instagram')
    @ApiOkResponse({"description": "Endpoint to redirect to Instagram authentification"})
    async instagramAuth(@Req() req: any, @Res() res: Response) {
        console.log("instagramAuth");
        const client_id = `${process.env.INSTA_CLIENT_ID}`;
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/instagram/callback`

        res.redirect('https://api.instagram.com/oauth/authorize' +
            '?client_id=' + client_id + '&redirect_uri=' + redirect_uri +
            '&scope=user_profile,user_media' + '&response_type=code' +
            '&state=' + req.user.email
        );
    }

    @ApiExcludeEndpoint()
    @Get('auth/instagram/callback')
    async instagramAuthCallback(@Req() req: any, @Res() res: Response) {
        console.log("instagramAuthCallback");
        this.instagramService.addService(req);
        res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
    }
}
