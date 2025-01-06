import { Injectable} from "@nestjs/common";
import { ReactionGithub } from "src/github/reactionGithub";
import { ReactionMicrosoft } from "src/microsoft/reactionMicrosoft";
import { ReactionSpotify } from "src/spotify/reactionSpotify";
import { ReactionNotion } from "src/notion/reactionNotion";
import { ReactionFigma } from "src/figma/reactionFigma";
import { ReactionGoogle } from "src/google/reactionGoogle";
import { ReactionLinear } from "src/linear/reactionLinear";
import { ReactionTwitch } from "src/twitch/reactionTwitch";
import { ReactionGitlab } from "src/gitlab/reactionGitlab";
import { ReactionSlack } from "src/slack/reactionSlack";
import { ReactionDropbox } from "src/dropbox/reactionDropbox";
import { ReactionMedium } from "src/medium/reactionMedium";

@Injectable()
export class ReactionArray {
    constructor(
      private readonly githubReaction: ReactionGithub,
      private readonly reactionMicrosoft: ReactionMicrosoft,
      private readonly reactionSpotify: ReactionSpotify,
      private readonly reactionNotion: ReactionNotion,
      private readonly reactionFigma: ReactionFigma,
      private readonly reactionGoogle: ReactionGoogle,
      private readonly reactionLinear: ReactionLinear,
      private readonly reactionTwitch: ReactionTwitch,
      private readonly reactionGitlab: ReactionGitlab,
      private readonly reactionSlack: ReactionSlack,
      private readonly reactionDropbox: ReactionDropbox,
      private readonly reactionMedium: ReactionMedium
    ) {}

    map: { [key: number] : (userService: any, arg: any) => any } = {
      1: this.githubReaction.createIssue,
      2: this.githubReaction.createPullRequest,
      4: this.reactionMicrosoft.createEvent,
      5: this.reactionSpotify.createPlaylist,
      6: this.reactionSpotify.addItemToPlaylist,
      7: this.reactionSpotify.deleteItemFromPlaylist,
      8: this.reactionSpotify.changePlaylistDetails,
      9: this.reactionMicrosoft.createDraft,
      10: this.reactionMicrosoft.createCalendarGroup,
      11: this.reactionMicrosoft.createCalendar,
      12: this.reactionMicrosoft.createOutlookCategory,
      13: this.reactionNotion.createPage,
      14: this.reactionNotion.commentPage,
      15: this.reactionFigma.addComment,
      16: this.reactionSpotify.savePlaylist,
      17: this.reactionSpotify.removePlaylist,
      18: this.reactionSpotify.saveAudioBook,
      19: this.reactionSpotify.removeAudioBook,
      20: this.reactionSpotify.saveEpisode,
      21: this.reactionSpotify.removeEpisode,
      22: this.reactionGoogle.createSheet,
      23: this.reactionGoogle.sendEmail,
      24: this.reactionNotion.createDatabase,
      25: this.reactionNotion.updatePage,
      26: this.reactionNotion.updateDatabase,
      27: this.reactionLinear.createIssue,
      28: this.reactionLinear.changeDisplayName,
      29: this.reactionLinear.createComment,
      30: this.reactionTwitch.createClip,
      31: this.reactionGitlab.createIssue,
      32: this.reactionGitlab.deleteIssue,
      33: this.reactionSlack.sendMessage,
      34: this.reactionSlack.leaveChannel,
      35: this.reactionSlack.renameChannel,
      36: this.reactionDropbox.deleteFile,
      37: this.reactionDropbox.copyFile,
      38: this.reactionMedium.createPost,
      39: this.reactionGitlab.createBranch,
      40: this.reactionGitlab.deleteBranch,
      41: this.reactionGitlab.createMergeRequest,
      42: this.reactionGitlab.deleteMergeRequest,
      43: this.githubReaction.createComment,
    };
  }
