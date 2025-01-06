import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { SpotifyService } from './spotify.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiExcludeEndpoint, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { config } from 'dotenv';

config();

@Controller('api')
export class SpotifyController {
    constructor(private readonly spotifyService: SpotifyService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('auth/spotify')
    @ApiOkResponse({"description": "Endpoint to redirect to Spotify authentification"})
    async spotifyAuth(@Req() req: any, @Res() res: Response) {
        console.log("spotifyAuth");
        const client_id = `${process.env.SPOTIFY_CLIENT_ID}`;
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/spotify/callback`
        const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public user-library-modify';

        res.redirect('https://accounts.spotify.com/authorize' +
            '?response_type=code' + '&client_id=' + client_id +
            '&scope=' + scope + '&redirect_uri=' + redirect_uri + '&state=' + req.user.email
        );
    }

    @ApiExcludeEndpoint()
    @Get('auth/spotify/callback')
    async spotifyAuthCallback(@Req() req: any, @Res() res: Response) {
        this.spotifyService.addService(req);
        res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
    }
}
