import { Module, forwardRef } from '@nestjs/common';
import { ReactionArray } from './reaction.array';
import { GithubModule } from 'src/github/github.module';
import { MicrosoftModule } from 'src/microsoft/microsoft.module';
import { SpotifyModule } from 'src/spotify/spotify.module';
import { NotionModule } from 'src/notion/notion.module';
import { FigmaModule } from 'src/figma/figma.module';
import { GoogleModule } from 'src/google/google.module';
import { LinearModule } from 'src/linear/linear.module';
import { TwitchModule } from 'src/twitch/twitch.module';
import { GitlabModule } from 'src/gitlab/gitlab.module';
import { SlackModule } from 'src/slack/slack.module';
import { DropboxModule } from 'src/dropbox/dropbox.module';
import { MediumModule } from 'src/medium/medium.module';

@Module({
  imports: [
    forwardRef(() => GithubModule),
    forwardRef(() => MicrosoftModule),
    forwardRef(() => SpotifyModule),
    forwardRef(() => NotionModule),
    forwardRef(() => FigmaModule),
    forwardRef(() => GoogleModule),
    forwardRef(() => LinearModule),
    forwardRef(() => TwitchModule),
    forwardRef(() => GitlabModule),
    forwardRef(() => SlackModule),
    forwardRef(() => DropboxModule),
    forwardRef(() => MediumModule),
  ],
  providers: [ReactionArray],
  exports: [ReactionArray],
})
export class ReactionModule {}
