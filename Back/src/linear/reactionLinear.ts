import { Injectable } from '@nestjs/common';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { LinearClient } from '@linear/sdk';
import { title } from 'process';

@Injectable()
export class ReactionLinear {
  async createIssue(userService: UserServiceEntity, arg: any) {
    const client = new LinearClient({ accessToken: userService.token });
    console.log('CREATE ISSUE');
    try {
      const teams = await client.administrableTeams();
      const team = teams.nodes[arg.team_id];
      await client.createIssue({ teamId: team.id, title: arg.title });
    } catch (error) {
      console.log(error);
    }
  }

  async changeDisplayName(userService: UserServiceEntity, arg: any) {
    const client = new LinearClient({ accessToken: userService.token });
    console.log('NAME CHANGE');
    try {
      const me = await client.viewer;
      if (me.id) {
        await client.updateUser(me.id, { displayName: arg.name });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createComment(userService: UserServiceEntity, arg: any) {
    const client = new LinearClient({ accessToken: userService.token });
    console.log('COMMENT CREATED');
    try {
      const commentPayload = await client.createComment({
        issueId: arg.issue_id,
        body: arg.body,
      });
      if (commentPayload.success) console.log('Comment created');
    } catch (error) {
      console.log(error);
    }
  }
}
