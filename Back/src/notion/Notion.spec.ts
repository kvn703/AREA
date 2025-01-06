import { ReactionNotion } from './reactionNotion';
import { UserServiceEntity } from '../entity/userService.entity';

describe('NotionReaction', () => {
  let reactionNotion: ReactionNotion;
  let fakeData: UserServiceEntity;

  beforeEach(() => {
    reactionNotion = new ReactionNotion();
    fakeData = new UserServiceEntity();
    fakeData.token = 'token';
    fakeData.serviceIdentifier = '123';
  });

  it('should be defined', () => {
    expect(reactionNotion).toBeDefined();
  });

  describe('createPage', () => {
    it('should create a page', async () => {
      expect(await reactionNotion.createPage(fakeData, {})).toBe(undefined);
    });
  });

  describe('commentPage', () => {
    it('should comment a page', async () => {
      expect(await reactionNotion.commentPage(fakeData, {})).toBe(undefined);
    });
  });

  describe('createDatabase', () => {
    it('should create a database', async () => {
      expect(await reactionNotion.createDatabase(fakeData, {})).toBe(undefined);
    });
  });

  describe('updatePage', () => {
    it('should update a page', async () => {
      expect(await reactionNotion.updatePage(fakeData, {})).toBe(undefined);
    });
  });

  describe('updateDatabase', () => {
    it('should update a database', async () => {
      expect(await reactionNotion.updateDatabase(fakeData, {})).toBe(undefined);
    });
  });
});
