import { gql } from "@apollo/client";

export const GET_POSTS_FROM_FOLLOW_USERS = gql`
  query GetPostsFromFollowedUsers($userId: Int!) {
    getPostsFromFollowedUsers(userId: $userId) {
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