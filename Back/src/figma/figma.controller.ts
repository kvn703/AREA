import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { FigmaService } from './figma.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { config } from 'dotenv';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOkResponse } from '@nestjs/swagger';

config();

@Controller('api')
export class FigmaController {
    constructor(private readonly figmaService: FigmaService) {}

    @ApiOkResponse({"description": "Endpoint to redirect to Figma authentification"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('auth/figma')
    async figmaAuth(@Req() req: any, @Res() res: Response) {
        console.log("figmaAuth");
        const client_id = process.env.FIGMA_CLIENT_ID
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/figma/callback`
        const scope = 'files:read file_variables:read file_variables:write file_comments:write'
        const state = req.user.email;
        const response_type = 'code';

        res.redirect('https://www.figma.com/oauth' +
        '?client_id=' + client_id + '&redirect_uri=' + redirect_uri +
        '&scope=' + scope + '&state=' + state + '&response_type=' + response_type);
    }

    @ApiExcludeEndpoint()
    @Get('auth/figma/callback')
    async figmaAuthCallback(@Req() req: any, @Res() res: Response) {
        this.figmaService.addService(req);
        res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
    }
}
