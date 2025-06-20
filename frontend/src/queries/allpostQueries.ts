import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query getAllPosts {
    getAllPosts {
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