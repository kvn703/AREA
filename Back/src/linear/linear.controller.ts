import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { LinearService } from './linear.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { config } from 'dotenv';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOkResponse } from '@nestjs/swagger';


@Controller('api')
export class LinearController {
    constructor(private readonly linearService: LinearService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOkResponse({"description": "Endpoint to redirect to Linear authentification"})
    @Get('auth/linear')
    async linearAuth(@Req() req: any, @Res() res: Response) {
        console.log("linearAuth");
        const client_id = process.env.LINEAR_CLIENT_ID
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/linear/callback`
        const scope = 'read,write,issues:create,comments:create'
        const state = req.user.email;
        const response_type = 'code';

        res.redirect('https://linear.app/oauth/authorize' +
        '?client_id=' + client_id + '&redirect_uri=' + redirect_uri +
        '&scope=' + scope + '&state=' + state + '&response_type=' + response_type);
    }

    @ApiExcludeEndpoint()
    @Get('auth/linear/callback')
    async linearAuthCallback(@Req() req: any, @Res() res: Response) {
        this.linearService.addService(req);
        res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
    }
}
