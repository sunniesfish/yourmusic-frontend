import { gql } from "@apollo/client";

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    name
    profileImg
  }
`;

export const PLAYLIST_JSON_FIELDS = gql`
  fragment PlaylistJsonFields on PlaylistJSON {
    title
    artist
    album
    thumbnail
  }
`;

export const PLAYLIST_FIELDS = gql`
  fragment PlaylistFields on Playlist {
    id
    name
    listJson {
      ...PlaylistJsonFields
    }
    user {
      ...UserFields
    }
  }
  ${PLAYLIST_JSON_FIELDS}
  ${USER_FIELDS}
`;
