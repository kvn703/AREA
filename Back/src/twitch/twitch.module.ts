import { Module } from '@nestjs/common';
import { TwitchController } from './twitch.controller';
import { TwitchService } from './twitch.service';
import { ReactionTwitch } from './reactionTwitch';

@Module({
  controllers: [TwitchController],
  providers: [TwitchService, ReactionTwitch],
  exports: [ReactionTwitch]
})
export class TwitchModule {}
