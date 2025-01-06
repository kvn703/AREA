import { ReactionSlack } from './reactionSlack';
import { UserServiceEntity } from '../entity/userService.entity';

describe('SlackReaction', () => {
  let reactionSlack: ReactionSlack;
  let fakeData: UserServiceEntity;

  beforeEach(() => {
    reactionSlack = new ReactionSlack();
    fakeData = new UserServiceEntity();
    fakeData.token = 'token';
  });

  it('should be defined', () => {
    expect(reactionSlack).toBeDefined();
  });

  describe('sendMessage', () => {
    it('should send a message', async () => {
      expect(await reactionSlack.sendMessage(fakeData, {})).toBe(undefined);
    });
  });

  describe('leaveChannel', () => {
    it('should leave a channel', async () => {
      expect(await reactionSlack.leaveChannel(fakeData, {})).toBe(undefined);
    });
  });

  describe('renameChannel', () => {
    it('should rename a channel', async () => {
      expect(await reactionSlack.renameChannel(fakeData, {})).toBe(undefined);
    });
  });
});
