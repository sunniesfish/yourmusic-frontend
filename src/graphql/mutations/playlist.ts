import { gql } from "@apollo/client";

export const SAVE_PLAYLIST = gql`
  mutation SavePlaylist($savePlaylistInput: SavePlaylistInput!) {
    savePlaylist(savePlaylistInput: $savePlaylistInput) {
      id
      name
      listJson
      user {
        id
        name
        profileImg
      }
    }
  }
`;

export const REMOVE_PLAYLIST = gql`
  mutation RemovePlaylist($id: Int!) {
    removePlaylist(id: $id) {
      id
      name
      listJson
    }
  }
`;

export const READ_PLAYLIST = gql`
  mutation ReadPlaylist($link: String!) {
    readPlaylist(link: $link) {
      title
      artist
      album
      thumbnail
    }
  }
`;

export const CONVERT_TO_SPOTIFY_PLAYLIST = gql`
  mutation ConvertToSpotifyPlaylist($playlistJSON: PlaylistJSONInput!) {
    convertToSpotifyPlaylist(playlistJSON: $playlistJSON)
  }
`;

export const CONVERT_TO_YOUTUBE_PLAYLIST = gql`
  mutation ConvertToYoutubePlaylist($playlistJSON: PlaylistJSONInput!) {
    convertToYoutubePlaylist(playlistJSON: $playlistJSON)
  }
`;
