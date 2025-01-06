import { Module } from '@nestjs/common';
import { GitlabController } from './gitlab.controller';
import { GitlabService } from './gitlab.service';
import { ReactionGitlab } from './reactionGitlab';

@Module({
  controllers: [GitlabController],
  providers: [GitlabService, ReactionGitlab],
  exports: [ReactionGitlab]
})
export class GitlabModule {}
