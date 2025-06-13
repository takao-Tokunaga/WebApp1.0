import { gql } from "@apollo/client";

export const CREATE_PROFILE = gql`
mutation createProfile($createProfileInput: CreateProfileInput!){
  createProfile(createProfileInput: $createProfileInput) {
    id
    displayName
    bio
    goal
  }
}
`;

export const UPDATE_PROFILE = gql`
mutation updateProfile($updateProfileInput: UpdateProfileInput!) {
  updateProfile(updateProfileInput: $updateProfileInput) {
    id
    displayName
    bio
    goal
  }
}
`;
