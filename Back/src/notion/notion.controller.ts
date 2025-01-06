import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { NotionService } from './notion.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { config } from 'dotenv';
import { ApiExcludeEndpoint, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

config();

@Controller('api')
export class NotionController {
    constructor(private readonly notionService: NotionService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOkResponse({"description": "Endpoint to redirect to Notion authentification"})
    @Get('auth/notion')
    async notionAuth(@Req() req: any, @Res() res: Response) {
        console.log("notionAuth");
        const client_id= process.env.NOTION_CLIENT_ID
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/notion/callback`
        const response_type = 'code'
        const owner = 'user'

        res.redirect('https://api.notion.com/v1/oauth/authorize' +
        '?response_type='+ response_type + '&client_id=' + client_id +
        '&redirect_uri=' + redirect_uri + '&owner=' + owner + '&state=' + req.user.email)
    }

    @ApiExcludeEndpoint()
    @Get('auth/notion/callback')
    async notionAuthCallback(@Req() req: any, @Res() res: Response) {
        this.notionService.addService(req);
        res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
    }
}
