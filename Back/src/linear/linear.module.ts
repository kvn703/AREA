import { Module } from '@nestjs/common';
import { LinearController } from './linear.controller';
import { LinearService } from './linear.service';
import { ReactionLinear } from './reactionLinear';


@Module({
  controllers: [LinearController],
  providers: [LinearService, ReactionLinear],
  exports: [ReactionLinear]
})
export class LinearModule {}
