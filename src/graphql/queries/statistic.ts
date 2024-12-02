import { gql } from "@apollo/client";

export const GET_STATISTIC = gql`
  query GetStatistic($userId: ID!) {
    statistic(userId: $userId) {
      userId
      albumRankJson
      artistRankJson
      genreRankJson
      user {
        id
        name
        profileImg
      }
    }
  }
`;
