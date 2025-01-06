import { ReactionGoogle } from './reactionGoogle';
import { UserServiceEntity } from '../entity/userService.entity';

describe('GoogleReaction', () => {
  let reactionGoogle: ReactionGoogle;
  let fakeData: UserServiceEntity;

  beforeEach(() => {
    reactionGoogle = new ReactionGoogle();
    fakeData = new UserServiceEntity();
    fakeData.token = 'token';
    fakeData.serviceIdentifier = '123';
  });

  it('should be defined', () => {
    expect(reactionGoogle).toBeDefined();
  });

  describe('createSheet', () => {
    it('should create a sheet', async () => {
      expect(await reactionGoogle.createSheet(fakeData, {})).toBe(undefined);
    });
  });

  describe('sendEmail', () => {
    it('should send an email', async () => {
      expect(await reactionGoogle.sendEmail(fakeData, {})).toBe(undefined);
    });
  });
});
