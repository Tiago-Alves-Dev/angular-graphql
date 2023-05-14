import { gql } from 'apollo-angular';

export const ROOM_REMOVE = gql`
  mutation RemoveRoom($roomId: String!) {
    removeRoom(roomId: $roomId)
  }
`;
