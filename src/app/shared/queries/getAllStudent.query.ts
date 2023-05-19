import { gql } from 'apollo-angular';

export const GET_ALL_STUDENTS = gql`
  query GetAllStudents {
    students {
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
      roomId
      room {
        name
      }
    }
  }
`;
