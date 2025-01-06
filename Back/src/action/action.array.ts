import { Injectable } from "@nestjs/common";
import { ActionGithub } from "src/github/actionGithub";
import { ActionMicrosoft } from "src/microsoft/actionMicrosoft";

@Injectable()
export class ActionArray {
    constructor(
      private readonly githubAction: ActionGithub,
      private readonly microsoftAction: ActionMicrosoft,
    ) {}

    map: { [key: number]: (userService: any, arg: any) => any } = {
      1: this.githubAction.onPush,
      2: this.githubAction.onPullReq,
      3: this.githubAction.onIssues,
      4: this.githubAction.onCreate,
      5: this.microsoftAction.onReceiveMail,
      6: this.githubAction.onDeleteBranch,
      7: this.githubAction.onIssues,
      8: this.githubAction.onPullReq,
      9: this.githubAction.onStarCreated,
      10: this.githubAction.onCommentCreated,
      11: this.githubAction.onMemberAdded,
    };
  }
