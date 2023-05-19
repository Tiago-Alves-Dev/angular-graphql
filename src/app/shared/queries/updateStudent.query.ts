import { gql } from 'apollo-angular';

export const STUDENT_UPDATE = gql`
  mutation updateStudent($studentId: String!, $data: UpdateStudentInput!) {
    updateStudent(studentId: $studentId, data: $data)
  }
`;
