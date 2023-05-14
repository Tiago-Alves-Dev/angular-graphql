import { gql } from 'apollo-angular';

export const ROOM_CREATE = gql`
  mutation RoomCreate($data: CreateRoomInput!) {
    createRoom(data: $data) {
      roomId
      name
      period
      description
      isActive
    }
  }
`;
