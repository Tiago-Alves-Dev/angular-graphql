import { gql } from 'apollo-angular';

export const USER_UPDATE = gql`
  mutation UpdateUser($userId: String!, $data: UpdateUserInput!) {
    updateUser(userId: $userId, data: $data)
  }
`;
