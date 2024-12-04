import { gql } from "@apollo/client";

// 유저 관련 쿼리
export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      profileImg
    }
  }
`;
