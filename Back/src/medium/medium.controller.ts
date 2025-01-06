import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { MediumService } from './medium.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { config } from 'dotenv';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

config();

@Controller('api')
export class MediumController {
  constructor(private readonly MediumService: MediumService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Endpoint to redirect to Medium authentification',
  })
  @Get('auth/medium')
  async mediumAuth(@Req() req: any, @Res() res: Response) {
    console.log('medium');
    this.MediumService.addService(req);
    res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
  }
}
