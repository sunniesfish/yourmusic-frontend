import { gql } from "@apollo/client";

// 플레이리스트 관련 쿼리
export const GET_PLAYLISTS = gql`
  query GetPlaylistsPaginated($page: Int!, $limit: Int!, $orderBy: String!) {
    playlists(page: $page, limit: $limit, orderBy: $orderBy) {
      playlists {
        id
        name
        listJson {
          title
          artist
          album
          thumbnail
        }
      }
      totalPages
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
