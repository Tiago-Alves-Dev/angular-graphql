import { gql } from 'apollo-angular';

export const GET_STUDENT = gql`
  query GetStudent($studentId: String!) {
    student(studentId: $studentId) {
      studentId
      name
      photo
      email
      phone
      address
      addressComplement
      addressNumber
      city
      state
      zipcode
      cpf
      age
      birth
      createdAt
      father
      mother
      registration
      isActive
      room {
        roomId
        name
        period
      }
    }
  }
`;
