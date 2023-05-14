import { gql } from 'apollo-angular';

export const ROOM_UPDATE = gql`
  mutation RoomUpdate($roomId: String!, $data: UpdateRoomInput!) {
    updateRoom(roomId: $roomId, data: $data)
  }
`;
