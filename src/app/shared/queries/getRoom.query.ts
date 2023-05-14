import { gql } from 'apollo-angular';

export const GET_ROOMS = gql`
  query GetRooms($roomId: String!) {
    room(roomId: $roomId) {
      roomId
      image
      name
      period
      description
      isActive
      hourStart
      hourEnd
      createdAt
      students {
        age
        name
        birth
      }
    }
  }
`;
