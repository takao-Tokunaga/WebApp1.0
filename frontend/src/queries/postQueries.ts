import { gql } from "@apollo/client";

export const GET_POST = gql`
query getPost($userId: Int!) {
  getPost(userId: $userId) {
    id
    type
    description
    createdAt
    user {
      profile { 
        displayName
      }
    }
  }
}
`