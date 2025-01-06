import { Module } from '@nestjs/common';
import { ActionArray } from './action.array';
import { GithubModule } from 'src/github/github.module';
import { MicrosoftModule } from 'src/microsoft/microsoft.module';

@Module({
  imports: [GithubModule, MicrosoftModule],
  providers: [ActionArray],
  exports: [ActionArray],
})
export class ActionModule {}
