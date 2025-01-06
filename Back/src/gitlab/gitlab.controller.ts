import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GitlabService } from './gitlab.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { config } from 'dotenv';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOkResponse } from '@nestjs/swagger';

config()

@Controller('api')
export class GitlabController {
    constructor(private readonly gitlabService: GitlabService) {}

    @ApiBearerAuth()
    @ApiOkResponse({"description": "Endpoint to redirect to Gitlab authentification"})
    @UseGuards(AuthGuard)
    @Get('auth/gitlab')
    async gitlabAuth(@Req() req: any, @Res() res: Response) {
        const client_id = process.env.GITLAB_CLIENT_ID
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/gitlab/callback`
        const scope = 'api read_user'
        const state = req.user.email;
        const response_type = 'code';

        res.redirect('https://gitlab.com/oauth/authorize' +
        '?client_id=' + client_id + '&redirect_uri=' + redirect_uri +
        '&scope=' + scope + '&state=' + state + '&response_type=' + response_type);
    }

    @ApiExcludeEndpoint()
    @Get('auth/gitlab/callback')
    async gitlabAuthCallback(@Req() req: any, @Res() res: Response) {
        this.gitlabService.addService(req);
        res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
    }
}
