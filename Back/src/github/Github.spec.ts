import { ReactionGithub } from './reactionGithub';
import { UserServiceEntity } from '../entity/userService.entity';
import { ActionGithub } from './actionGithub';

describe('GithubAction', () => {
  let actionGithub: ActionGithub;
  let fakeData: UserServiceEntity;

  beforeEach(() => {
    actionGithub = new ActionGithub();
    fakeData = new UserServiceEntity();
    fakeData.token = 'token';
    fakeData.serviceIdentifier = '123';
  });

  it('should be defined', () => {
    expect(actionGithub).toBeDefined();
  });

  describe('onPush', () => {
    it('should create an issue', async () => {
      expect(await actionGithub.onPush(fakeData, {})).toBe(undefined);
    });
  });

  describe('onPullRequest', () => {
    it('should delete an issue', async () => {
      expect(await actionGithub.onPullReq(fakeData, {})).toBe(undefined);
    });
  });

  describe('onIssues', () => {
    it('should delete an issue', async () => {
      expect(await actionGithub.onIssues(fakeData, {})).toBe(undefined);
    });
  });

  describe('onCreate', () => {
    it('should delete an issue', async () => {
      expect(await actionGithub.onCreate(fakeData, {})).toBe(undefined);
    });
  });

  describe('onDeleteBranch', () => {
    it('should delete an issue', async () => {
      expect(await actionGithub.onDeleteBranch(fakeData, {})).toBe(undefined);
    });
  });

  describe('onStarCreated', () => {
    it('should delete an issue', async () => {
      expect(await actionGithub.onStarCreated(fakeData, {})).toBe(undefined);
    });
  });
});

describe('GithubReaction', () => {
  let reactionGithub: ReactionGithub;
  let fakeData: UserServiceEntity;

  beforeEach(() => {
    reactionGithub = new ReactionGithub();
    fakeData = new UserServiceEntity();
    fakeData.token = 'token';
    fakeData.serviceIdentifier = '123';
  });

  it('should be defined', () => {
    expect(reactionGithub).toBeDefined();
  });

  describe('createIssue', () => {
    it('should create an issue', async () => {
      expect(await reactionGithub.createIssue(fakeData, {})).toBe(undefined);
    });
  });

  describe('createPullRequest', () => {
    it('should create a pull request', async () => {
      expect(await reactionGithub.createPullRequest(fakeData, {})).toBe(
        undefined,
      );
    });
  });
});
