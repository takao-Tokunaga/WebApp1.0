import { gql } from "@apollo/client";

export const CREATE_POST = gql`
mutation createPost($createPostInput: CreatePostInput!){
  createPost(createPostInput: $createPostInput) {
    id
    type
    description
    createdAt
  }
}
`;

export const UPDATE_POST = gql`
mutation updatePost($updatePostInput: UpdatePostInput!) {
  updatePost(updatePostInput: $updatePostInput) {
    id
    type
    description
    createdAt
  }
}
`;

export const DELETE_POST = gql`
mutation deletePost($id: Int!, $userId: Int!) {
  deletePost(id: $id, userId: $userId) {
    id
  }
}
`