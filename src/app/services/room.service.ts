import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable, map } from 'rxjs';
import { RoomDto } from '../dtos/room.dto';
import { GET_ALL_ROOMS } from '../queries/getAllRoom.query';

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
}
