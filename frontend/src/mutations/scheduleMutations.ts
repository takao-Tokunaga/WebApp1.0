import { gql } from '@apollo/client';

export const CREATE_SCHEDULE = gql`
mutation createSchedule($createScheduleInput: CreateScheduleInput!) {
  createSchedule(createScheduleInput: $createScheduleInput) {
    id
    title
    dueDate
    description
  }
}
`;

export const UPDATE_SCHEDULE = gql`
mutation updateSchedule($updateScheduleInput: UpdateScheduleInput!) {
  updateSchedule(updateScheduleInput: $updateScheduleInput) {
    id
    title
    dueDate
    description
  }
}
`;

export const DELETE_SCHEDULE = gql`
mutation deleteSchedule($id: Int!) {
  deleteSchedule(id: $id) {
    id
  }
}
`;