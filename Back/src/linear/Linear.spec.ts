import { ReactionLinear } from './reactionLinear';
import { UserServiceEntity } from '../entity/userService.entity';

describe('LinearReaction', () => {
  let reactionLinear: ReactionLinear;
  let fakeData: UserServiceEntity;

  beforeEach(() => {
    reactionLinear = new ReactionLinear();
    fakeData = new UserServiceEntity();
    fakeData.token = 'token';
    fakeData.serviceIdentifier = '123';
  });

  it('should be defined', () => {
    expect(reactionLinear).toBeDefined();
  });

  describe('createIssue', () => {
    it('should create an issue', async () => {
      expect(await reactionLinear.createIssue(fakeData, {})).toBe(undefined);
    });
  });

  describe('changeDisplayName', () => {
    it('should change display name', async () => {
      expect(await reactionLinear.changeDisplayName(fakeData, {})).toBe(
        undefined,
      );
    });
  });

  describe('createComment', () => {
    it('should create a comment', async () => {
      expect(await reactionLinear.createComment(fakeData, {})).toBe(undefined);
    });
  });
});
