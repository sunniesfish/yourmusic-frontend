import { gql } from "@apollo/client";

// 플레이리스트 관련 쿼리
export const GET_PLAYLISTS = gql`
  query GetPlaylists {
    playlists {
      id
      name
      listJson {
        title
        artist
        album
        thumbnail
      }
      user {
        id
        name
        profileImg
      }
    }
  }
`;

export const GET_PLAYLIST = gql`
  query GetPlaylist($id: Int!) {
    playlist(id: $id) {
      id
      name
      listJson {
        title
        artist
        album
        thumbnail
      }
      user {
        id
        name
        profileImg
      }
    }
  }
`;
