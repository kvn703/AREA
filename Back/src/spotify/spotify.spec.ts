import { ReactionSpotify } from "./reactionSpotify";
import { UserServiceEntity } from "../entity/userService.entity";

describe("SpotifyReaction", () => {
    let reactionSpotify: ReactionSpotify;
    let fakeData: UserServiceEntity;
    
    beforeEach(() => {
        reactionSpotify = new ReactionSpotify();
        fakeData = new UserServiceEntity();
        fakeData.token = "token";
        fakeData.serviceIdentifier = "123";
    });
    
    it("should be defined", () => {
        expect(reactionSpotify).toBeDefined();
    });

    describe("createPlaylist", () => {
        it('should create a playlist', async () => {
            expect(await reactionSpotify.createPlaylist(fakeData, {})).toBe(undefined);
        });
    });

    describe("addItemToPlaylist", () => {
        it('should add an item to a playlist', async () => {
            expect(await reactionSpotify.addItemToPlaylist(fakeData, {})).toBe(undefined);
        });
    });

    describe("deleteItemFromPlaylist", () => {
        it('should delete an item from a playlist', async () => {
            expect(await reactionSpotify.deleteItemFromPlaylist(fakeData, {})).toBe(undefined);
        });
    });

    describe("changePlaylistDetails", () => {
        it('should change the details of a playlist', async () => {
            expect(await reactionSpotify.changePlaylistDetails(fakeData, {})).toBe(undefined);
        });
    });

    describe("savePlaylist", () => {
        it('should save a playlist', async () => {
            expect(await reactionSpotify.savePlaylist(fakeData, {})).toBe(undefined);
        });
    });

    describe("removePlaylist", () => {
        it('should remove a playlist', async () => {
            expect(await reactionSpotify.removePlaylist(fakeData, {})).toBe(undefined);
        });
    });

    describe("saveAudioBook", () => {
        it('should save an audiobook', async () => {
            expect(await reactionSpotify.saveAudioBook(fakeData, {})).toBe(undefined);
        });
    });

    describe("removeAudioBook", () => {
        it('should remove an audiobook', async () => {
            expect(await reactionSpotify.removeAudioBook(fakeData, {})).toBe(undefined);
        });
    });

    describe("saveEpisode", () => {
        it('should save an episode', async () => {
            expect(await reactionSpotify.saveEpisode(fakeData, {})).toBe(undefined);
        });
    });

    describe("removeEpisode", () => {
        it('should remove an episode', async () => {
            expect(await reactionSpotify.removeEpisode(fakeData, {})).toBe(undefined);
        });
    });
});