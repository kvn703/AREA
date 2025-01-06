import { Module } from '@nestjs/common';
import { SlackController } from './slack.controller';
import { SlackService } from './slack.service';
import { ReactionSlack } from './reactionSlack';

@Module({
  controllers: [SlackController],
  providers: [SlackService, ReactionSlack],
  exports: [ReactionSlack],
})
export class SlackModule {}
