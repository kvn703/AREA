import { Module } from '@nestjs/common';
import { NotionService } from './notion.service';
import { NotionController } from './notion.controller';
import { ReactionNotion } from './reactionNotion';

@Module({
  controllers: [NotionController],
  providers: [NotionService, ReactionNotion],
  exports: [ReactionNotion]
})
export class NotionModule {}
