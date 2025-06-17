import { gql } from "@apollo/client";

export const GET_Timeline = gql`
query getTimelinePosts {
    getTimelinePosts {
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