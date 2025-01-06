import { Controller, Get, Req, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiCreatedResponse, ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { promises as fsPromises, createReadStream } from 'fs';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'Hello World' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('about.json')
  @ApiOkResponse({ description: 'Return about.json' })
  async sendAbout(@Req() request: Request): Promise<any> {
    const jsonData = await fsPromises.readFile('./about.json', 'utf-8');
    const config = JSON.parse(jsonData);

    const clientIp = request.ip.includes('::ffff:') ? request.ip.slice(7) : request.ip;

    const clientInfo = {
      client: {
        host: clientIp
      }
    };
    config.server = {
      current_time: Math.floor(new Date().getTime() / 1000),
      ...config.server
    };

    const updatedConfig = { ...clientInfo, ...config };

    return updatedConfig;
  }

  @Get('client.apk')
  @ApiOkResponse({ description: 'Download the app.apk' })
  getApk(): StreamableFile {
    const file = createReadStream('./apk/app-release.apk');
    return new StreamableFile(file);
  }
}
