import { gql } from 'apollo-angular';

export const GET_ALL_ROOMS = gql`
  query GetAllooms {
    rooms {
      roomId
      image
      name
      period
      description
      hourEnd
      hourStart
      isActive
      createdAt
      students {
        name
        registration
        phone
        cpf
      }
    }
  }
`;
