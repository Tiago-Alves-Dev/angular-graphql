import { gql } from 'apollo-angular';

export const USER_CREATE = gql`
  mutation UserCreate($data: CreateUserInput!) {
    createUser(data: $data) {
      userId
      name
      email
      image
    }
  }
`;
