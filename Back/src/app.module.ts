import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { GoogleModule } from './google/google.module';
import { AuthModule } from './auth/auth.module';
import { GithubModule } from './github/github.module';
import * as dotenv from 'dotenv';
import { SmeeModule } from './smee/smee.module';
import { InitService } from './initialization/initiService';
import { CreationAreaModule } from './creation-area/creation-area.module';
import { FrontDataModule } from './front-data/front-data.module';
import { MicrosoftModule } from './microsoft/microsoft.module';
import { SpotifyModule } from './spotify/spotify.module';
import { InstagramModule } from './instagram/instagram.module';
import { NotionModule } from './notion/notion.module';
import { FigmaModule } from './figma/figma.module';
import { LinearModule } from './linear/linear.module';
import { DropboxModule } from './dropbox/dropbox.module';
import { GitlabModule } from './gitlab/gitlab.module';
import { TwitchModule } from './twitch/twitch.module';
import { SlackModule } from './slack/slack.module';
import { MediumModule } from './medium/medium.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5h' },
    }),
    AuthModule,
    GoogleModule,
    GithubModule,
    MicrosoftModule,
    SmeeModule,
    CreationAreaModule,
    FrontDataModule,
    SpotifyModule,
    InstagramModule,
    NotionModule,
    FigmaModule,
    LinearModule,
    DropboxModule,
    GitlabModule,
    TwitchModule,
    SlackModule,
    MediumModule,
  ],
  controllers: [AppController],
  providers: [AppService, InitService],
})
export class AppModule {}
