import { ReactionTwitch } from "./reactionTwitch";
import { UserServiceEntity } from "../entity/userService.entity";

describe("TwitchReaction", () => {
    let reactionTwitch: ReactionTwitch;
    
    beforeEach(() => {
        reactionTwitch = new ReactionTwitch();
    });
    
    it("should be defined", () => {
        expect(reactionTwitch).toBeDefined();
    });

    describe("createClip", () => {
        const fakeData = new UserServiceEntity();
        fakeData.token = "token";
        it('should create a clip', async () => {
            expect(await reactionTwitch.createClip(fakeData, {broadcaster_id: "123"})).toBe(undefined);
        });
    });
});