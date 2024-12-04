import { gql } from "@apollo/client";

// 통계 관련 쿼리
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
