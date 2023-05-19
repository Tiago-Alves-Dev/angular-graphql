import { gql } from 'apollo-angular';

export const STUDENT_CREATE = gql`
  mutation StudentCreate($data: CreateStudentInput!) {
    createStudent(data: $data) {
      name
      studentId
      age
    }
  }
`;
