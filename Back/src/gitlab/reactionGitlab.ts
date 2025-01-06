import { Injectable } from '@nestjs/common';
import { UserServiceEntity } from 'src/entity/userService.entity';
import axios, { Axios } from 'axios';

@Injectable()
export class ReactionGitlab {

  async createIssue(userService: UserServiceEntity, arg: any) {
    const headers = {
      Authorization: `Bearer ${userService.token}`,
    };
    await axios
      .post(
        'https://gitlab.com/api/v4/projects/' +
          arg.project_id +
          '/issues?title=' +
          arg.title +
          '&description=' +
          arg.description,
        {},
        { headers: headers },
      )
      .then((response) => {
        console.log("Issue created");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  async deleteIssue(userService: UserServiceEntity, arg: any) {
    const headers = {
      Authorization: `Bearer ${userService.token}`,
    };
    await axios
      .delete(
        'https://gitlab.com/api/v4/projects/' +
          arg.project_id +
          '/issues/' +
          arg.issue_id,
        { headers: headers },
      )
      .then((response) => {
        console.log("Issue deleted");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  async createBranch(userService: UserServiceEntity, arg: any) {
    const headers = {
      Authorization: `Bearer ${userService.token}`,
    };
    await axios
      .post(
        'https://gitlab.com/api/v4/projects/' +
          arg.project_id +
          '/repository/branches?branch=' +
          arg.branch_name +
          '&ref=' +
          arg.ref,
        {},
        { headers: headers },
      )
      .then((response) => {
        console.log("Branch created");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  async deleteBranch(userService: UserServiceEntity, arg: any) {
    const headers = {
      Authorization: `Bearer ${userService.token}`,
    };
    await axios
      .delete(
        'https://gitlab.com/api/v4/projects/' +
          arg.project_id +
          '/repository/branches/' +
          arg.branch_name,
        { headers: headers },
      )
      .then((response) => {
        console.log("Branch deleted");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  async createMergeRequest(userService: UserServiceEntity, arg: any) {
    const headers = {
      Authorization: `Bearer ${userService.token}`,
    };
    await axios
      .post(
        'https://gitlab.com/api/v4/projects/' +
          arg.project_id +
          '/merge_requests?source_branch=' +
          arg.source_branch +
          '&target_branch=' +
          arg.target_branch +
          '&title=' +
          arg.title +
          '&description=' +
          arg.description,
        {},
        { headers: headers },
      )
      .then((response) => {
        console.log("Merge request created");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  async deleteMergeRequest(userService: UserServiceEntity, arg: any) {
    const headers = {
      Authorization: `Bearer ${userService.token}`,
    };
    await axios
      .delete(
        'https://gitlab.com/api/v4/projects/' +
          arg.project_id +
          '/merge_requests/' +
          arg.merge_request_id,
        { headers: headers },
      )
      .then((response) => {
        console.log("Merge request deleted");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
}
