import { gql } from 'apollo-angular';

export const STUDENT_REMOVE = gql`
  mutation RemoveStudent($studentId: String!) {
    removeStudent(studentId: $studentId)
  }
`;
