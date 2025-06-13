import { gql } from '@apollo/client';

export const GET_SCHEDULES = gql`
query getSchedules($userId: Int!) {
    getSchedules(userId: $userId) {
        id
        title
        dueDate
        description
    }
}
`
