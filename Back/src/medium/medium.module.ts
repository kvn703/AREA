import { Module } from '@nestjs/common';
import { MediumController } from './medium.controller';
import { MediumService } from './medium.service';
import { ReactionMedium } from './reactionMedium';

@Module({
  providers: [ReactionMedium, MediumService],
  controllers: [MediumController],
  exports: [ReactionMedium],
})
export class MediumModule {}
