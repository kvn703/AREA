import { Module, forwardRef } from '@nestjs/common';
import { MicrosoftController } from './microsoft.controller';
import { MicrosoftService } from './microsoft.service';
import { AuthModule } from 'src/auth/auth.module';
import { ReactionMicrosoft } from './reactionMicrosoft';
import { ActionMicrosoft } from './actionMicrosoft';
import { ReactionModule } from 'src/reaction/reaction.module';

@Module({
  imports: [AuthModule, forwardRef(() => ReactionModule)],
  controllers: [MicrosoftController],
  providers: [MicrosoftService, ReactionMicrosoft, ActionMicrosoft],
  exports: [ReactionMicrosoft, ActionMicrosoft],
})
export class MicrosoftModule {}
