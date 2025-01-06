import { Module } from '@nestjs/common';
import { DropboxController } from './dropbox.controller';
import { DropboxService } from './dropbox.service';
import { ReactionDropbox } from './reactionDropbox';

@Module({
  controllers: [DropboxController],
  providers: [DropboxService, ReactionDropbox],
  exports: [ReactionDropbox],
})
export class DropboxModule {}
