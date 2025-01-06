import { Module, forwardRef } from '@nestjs/common';
import { GitHubController } from './github.controller';
import { GitHubService } from './github.service';
import { AuthModule } from 'src/auth/auth.module';
import { ReactionGithub } from './reactionGithub';
import { ActionGithub } from './actionGithub';
import { ReactionModule } from 'src/reaction/reaction.module';

@Module({
  imports: [AuthModule, forwardRef(() => ReactionModule)],
  controllers: [GitHubController],
  providers: [GitHubService, ReactionGithub, ActionGithub],
  exports: [ReactionGithub, ActionGithub]
})
export class GithubModule {}
