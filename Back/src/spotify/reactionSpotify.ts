import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserServiceEntity } from 'src/entity/userService.entity';

@Injectable()
export class ReactionSpotify {
  async createPlaylist(userService: UserServiceEntity, arg: any) {
    console.log('CREATE PLAYLIST');
    const headers = {
      Authorization: `Bearer ${userService.token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      name: arg.playlist,
    };

    await axios
      .post(
        'https://api.spotify.com/v1/users/' +
          userService.serviceIdentifier +
          '/playlists',
        data,
        { headers: headers },
      )
      .then((response) => {
        console.log('SUCCESS: ', response.data);
      })
      .catch((error) => {
        console.log('ERROR: ', error.response.data);
      });
  }

  async addItemToPlaylist(userService: UserServiceEntity, arg: any) {
    console.log('ADD ITEM TO PLAYLIST');
    const headers = {
      Authorization: `Bearer ${userService.token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      uris: [arg.item_uri],
    };

    await axios
      .post(
        'https://api.spotify.com/v1/playlists/' + arg.playlist_id + '/tracks',
        data,
        { headers: headers },
      )
      .then((response) => {
        console.log('SUCCESS: ', response.data);
      })
      .catch((error) => {
        console.log('ERROR: ', error.response.data);
      });
  }

  async deleteItemFromPlaylist(userService: UserServiceEntity, arg: any) {
    console.log('DELETE ITEM FROM PLAYLIST');
    const headers = {
      Authorization: `Bearer ${userService.token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      uris: [arg.item_uri],
    };

    await axios
      .delete(
        'https://api.spotify.com/v1/playlists/' + arg.playlist_id + '/tracks',
        { headers: headers, data: data },
      )
      .then((response) => {
        console.log('SUCCESS: ', response.data);
      })
      .catch((error) => {
        console.log('ERROR: ', error.response.data);
      });
  }

  async changePlaylistDetails(userService: UserServiceEntity, arg: any) {
    console.log('CHANGE PLAYLIST DETAILS');
    const headers = {
      Authorization: `Bearer ${userService.token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      name: arg.new_playlist_name,
      description: arg.new_playlist_description,
    };

    await axios
      .put('https://api.spotify.com/v1/playlists/' + arg.playlist_id, data, {
        headers: headers,
      })
      .then((response) => {
        console.log('SUCCESS: ', response.data);
      })
      .catch((error) => {
        console.log('ERROR: ', error.response.data);
      });
  }

  async savePlaylist(userService: UserServiceEntity, arg: any) {
    console.log('SAVE PLAYLIST');
    const headers = {
      Authorization: `Bearer ${userService.token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      ids: [arg.playlist_id],
    };

    await axios
      .put(
        'https://api.spotify.com/v1/me/albums?ids=' + arg.playlist_id,
        data,
        { headers: headers },
      )
      .then((response) => {
        console.log('SUCCESS: ', response.data);
      })
      .catch((error) => {
        console.log('ERROR: ', error.response.data);
      });
  }

  async removePlaylist(userService: UserServiceEntity, arg: any) {
    console.log('REMOVE PLAYLIST');
    const headers = {
      Authorization: `Bearer ${userService.token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      ids: [arg.playlist_id],
    };

    await axios
      .delete('https://api.spotify.com/v1/me/albums?ids=' + arg.playlist_id, {
        headers: headers,
        data: data,
      })
      .then((response) => {
        console.log('SUCCESS: ', response.data);
      })
      .catch((error) => {
        console.log('ERROR: ', error.response.data);
      });
  }

  async saveAudioBook(userService: UserServiceEntity, arg: any) {
    console.log('SAVE AUDIOBOOK');
    const headers = {
      Authorization: `Bearer ${userService.token}`,
      'Content-Type': 'application/json',
    };

    await axios
      .put(
        'https://api.spotify.com/v1/me/audiobooks?ids=' + arg.audiobook_id,
        undefined,
        { headers: headers },
      )
      .then((response) => {
        console.log('SUCCESS: ', response.data);
      })
      .catch((error) => {
        console.log('ERROR: ', error.response.data);
      });
  }

  async removeAudioBook(userService: UserServiceEntity, arg: any) {
    console.log('REMOVE AUDIOBOOK');
    const headers = {
      Authorization: `Bearer ${userService.token}`,
      'Content-Type': 'application/json',
    };

    await axios
      .delete(
        'https://api.spotify.com/v1/me/audiobooks?ids=' + arg.audiobook_id,
        {
          headers: headers,
        },
      )
      .then((response) => {
        console.log('SUCCESS: ', response.data);
      })
      .catch((error) => {
        console.log('ERROR: ', error.response.data);
      });
  }

  async saveEpisode(userService: UserServiceEntity, arg: any) {
    console.log('SAVE EPISODE');
    const headers = {
      Authorization: `Bearer ${userService.token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      ids: [arg.episode_id],
    };

    await axios
      .put(
        'https://api.spotify.com/v1/me/episodes?ids=' + arg.episode_id,
        data,
        { headers: headers },
      )
      .then((response) => {
        console.log('SUCCESS: ', response.data);
      })
      .catch((error) => {
        console.log('ERROR: ', error.response.data);
      });
  }

  async removeEpisode(userService: UserServiceEntity, arg: any) {
    console.log('REMOVE EPISODE');
    const headers = {
      Authorization: `Bearer ${userService.token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      ids: [arg.episode_id],
    };

    await axios
      .delete('https://api.spotify.com/v1/me/episodes?ids=' + arg.episode_id, {
        headers: headers,
        data: data,
      })
      .then((response) => {
        console.log('SUCCESS: ', response.data);
      })
      .catch((error) => {
        console.log('ERROR: ', error.response.data);
      });
  }
}
