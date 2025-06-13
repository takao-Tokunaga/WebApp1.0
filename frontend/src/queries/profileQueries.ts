import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
query getProfile($userId: Int!) {
  getProfile(userId: $userId) {
    id
    displayName
    bio
    goal
  }
}
`