const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsFromPlaylist(playlistId) {
    const playlistWithUserQuery = {
      text: 'SELECT playlists.*, users.username FROM playlists LEFT JOIN users ON users.id = playlists.owner WHERE playlists.id = $1',
      values: [playlistId],
    };

    const playlistWithUserResult = await this._pool.query(playlistWithUserQuery);

    const songsQuery = {
      text: 'SELECT songs.id, songs.title, songs.performer FROM songs LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id WHERE playlist_songs.playlist_id = $1',
      values: [playlistId],
    };

    const playlist = playlistWithUserResult.rows[0];
    const resultSongsQuery = await this._pool.query(songsQuery);

    return {
      playlist: {
        id: playlist.id,
        name: playlist.name,
        songs: resultSongsQuery.rows,
      },
    };
  }
}

module.exports = PlaylistsService;
