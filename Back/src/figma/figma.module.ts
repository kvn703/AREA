import { Module } from '@nestjs/common';
import { FigmaController } from './figma.controller';
import { FigmaService } from './figma.service';
import { ReactionFigma } from './reactionFigma';

@Module({
  controllers: [FigmaController],
  providers: [FigmaService, ReactionFigma],
  exports: [ReactionFigma]
})
export class FigmaModule {}
