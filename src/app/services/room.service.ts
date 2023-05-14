import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable, map } from 'rxjs';
import { RoomDto } from '../dtos/room.dto';
import { GET_ALL_ROOMS } from '../queries/getAllRoom.query';
import { GET_ROOMS } from '../queries/getRoom.query';
import { ROOM_CREATE } from '../queries/createRoom.query';
import { ROOM_UPDATE } from '../queries/updateRoom.query';
import { ROOM_REMOVE } from '../queries/removeRoom.query';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private readonly apollo: Apollo) {}

  getAllRooms(): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .query({
        query: GET_ALL_ROOMS,
      })
      .pipe(map((res: any) => res));
  }

  getRoom(roomId: string): Observable<ApolloQueryResult<RoomDto>> {
    return this.apollo
      .query({
        query: GET_ROOMS,
        variables: {
          roomId,
        },
      })
      .pipe(map((res: any) => res));
  }

  createRoom(data: RoomDto): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .mutate({
        mutation: ROOM_CREATE,
        variables: {
          data,
        },
      })
      .pipe(map((res: any) => res));
  }

  updateRoom(roomId: string | undefined, data: RoomDto): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .mutate({
        mutation: ROOM_UPDATE,
        variables: {
          roomId,
          data,
        },
      })
      .pipe(map((res: any) => res));
  }

  deleteRoom(roomId: string | undefined): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .mutate({
        mutation: ROOM_REMOVE,
        variables: {
          roomId,
        },
      })
      .pipe(map((res: any) => res));
  }
}
