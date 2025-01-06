import { ReactionDropbox } from './reactionDropbox';
import { UserServiceEntity } from '../entity/userService.entity';

describe('DropboxReaction', () => {
  let reactionDropbox: ReactionDropbox;
  let fakeData: UserServiceEntity;

  beforeEach(() => {
    reactionDropbox = new ReactionDropbox();
    fakeData = new UserServiceEntity();
    fakeData.token = 'token';
    fakeData.serviceIdentifier = '123';
  });

  it('should be defined', () => {
    expect(reactionDropbox).toBeDefined();
  });

  describe('deleteFile', () => {
    it('should delete a file', async () => {
      expect(await reactionDropbox.deleteFile(fakeData, {})).toBe(undefined);
    });
  });

  describe('copyFile', () => {
    it('should copy a file', async () => {
      expect(await reactionDropbox.copyFile(fakeData, {})).toBe(undefined);
    });
  });
});
