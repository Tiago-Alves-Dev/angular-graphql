import { gql } from 'apollo-angular';

export const SIGN_IN = gql`
  mutation SignIn($data: AuthInput!) {
    signIn(data: $data) {
      user {
        name
        userId
        email
      }
      accessToken
    }
  }
`;
