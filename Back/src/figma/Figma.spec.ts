import { ReactionFigma } from './reactionFigma';
import { UserServiceEntity } from '../entity/userService.entity';

describe('FigmaReaction', () => {
  let reactionFigma: ReactionFigma;
  let fakeData: UserServiceEntity;

  beforeEach(() => {
    reactionFigma = new ReactionFigma();
    fakeData = new UserServiceEntity();
    fakeData.token = 'token';
    fakeData.serviceIdentifier = '123';
  });

  it('should be defined', () => {
    expect(reactionFigma).toBeDefined();
  });

  describe('addComment', () => {
    it('should add a comment', async () => {
      expect(await reactionFigma.addComment(fakeData, {})).toBe(undefined);
    });
  });
});
