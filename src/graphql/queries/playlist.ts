import { gql } from "@apollo/client";

export const GET_PLAYLIST = gql`
  query GetPlaylist($id: Int!) {
    playlist(id: $id) {
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
