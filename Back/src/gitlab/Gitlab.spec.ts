import { ReactionGitlab } from './reactionGitlab';
import { UserServiceEntity } from '../entity/userService.entity';

describe('GitlabReaction', () => {
  let reactionGitlab: ReactionGitlab;
  let fakeData: UserServiceEntity;

  beforeEach(() => {
    reactionGitlab = new ReactionGitlab();
    fakeData = new UserServiceEntity();
    fakeData.token = 'token';
    fakeData.serviceIdentifier = '123';
  });

  it('should be defined', () => {
    expect(reactionGitlab).toBeDefined();
  });

  describe('createIssue', () => {
    it('should create an issue', async () => {
      expect(await reactionGitlab.createIssue(fakeData, {})).toBe(undefined);
    });
  });

  describe('deleteIssue', () => {
    it('should delete an issue', async () => {
      expect(await reactionGitlab.deleteIssue(fakeData, {})).toBe(undefined);
    });
  });

});
