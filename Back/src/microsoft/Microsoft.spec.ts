import { ReactionMicrosoft } from './reactionMicrosoft';
import { UserServiceEntity } from '../entity/userService.entity';
import { ActionMicrosoft } from './actionMicrosoft';

describe('MicrosoftAction', () => {
  let actionMicrosoft: ActionMicrosoft;
  let fakeData: UserServiceEntity;

  beforeEach(() => {
    actionMicrosoft = new ActionMicrosoft();
    fakeData = new UserServiceEntity();
    fakeData.token = 'token';
    fakeData.serviceIdentifier = '123';
  });

  it('should be defined', () => {
    expect(actionMicrosoft).toBeDefined();
  });

  describe('onReceiveMail', () => {
    actionMicrosoft = new ActionMicrosoft();
    it('should receive an email', async () => {
      expect(await actionMicrosoft.onReceiveMail(fakeData, {})).toBe(undefined);
    });
  });
});

describe('MicrosoftReaction', () => {
  let reactionMicrosoft: ReactionMicrosoft;
  let fakeData: UserServiceEntity;

  beforeEach(() => {
    reactionMicrosoft = new ReactionMicrosoft();
    fakeData = new UserServiceEntity();
    fakeData.token = 'token';
    fakeData.serviceIdentifier = '123';
  });

  it('should be defined', () => {
    expect(reactionMicrosoft).toBeDefined();
  });

  describe('createEvent', () => {
    it('should create an event', async () => {
      expect(await reactionMicrosoft.createEvent(fakeData, {})).toBe(undefined);
    });
  });

  describe('createDraft', () => {
    it('should create a draft', async () => {
      expect(await reactionMicrosoft.createDraft(fakeData, {})).toBe(undefined);
    });
  });

  describe('createCalendarGroup', () => {
    it('should create a calendar group', async () => {
      expect(await reactionMicrosoft.createCalendarGroup(fakeData, {})).toBe(
        undefined,
      );
    });
  });

  describe('createCalendar', () => {
    it('should create a calendar', async () => {
      expect(await reactionMicrosoft.createCalendar(fakeData, {})).toBe(
        undefined,
      );
    });
  });

  describe('createOutlookCategory', () => {
    it('should create an outlook category', async () => {
      expect(await reactionMicrosoft.createOutlookCategory(fakeData, {})).toBe(
        undefined,
      );
    });
  });
});
