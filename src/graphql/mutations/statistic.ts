import { gql } from "@apollo/client";

export const SAVE_STATISTIC = gql`
  mutation SaveStatistic($saveStatisticInput: SaveStatisticInput!) {
    saveStatistic(saveStatisticInput: $saveStatisticInput) {
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

export const UPDATE_STATISTIC = gql`
  mutation UpdateStatistic($updateStatisticInput: UpdateStatisticInput!) {
    updateStatistic(updateStatisticInput: $updateStatisticInput) {
      userId
      albumRankJson
      artistRankJson
      genreRankJson
    }
  }
`;

export const REMOVE_STATISTIC = gql`
  mutation RemoveStatistic($userId: ID!) {
    removeStatistic(userId: $userId) {
      userId
      albumRankJson
      artistRankJson
      genreRankJson
    }
  }
`;
