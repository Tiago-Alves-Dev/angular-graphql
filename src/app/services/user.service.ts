import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable, map } from 'rxjs';
import { USER_UPDATE } from '../queries/updateUser.query';
import { UserDto } from '../dtos/user.dto';
import { USER_CREATE } from '../queries/createUser.query';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly apollo: Apollo) {}

  createUser(data: UserDto): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .query({
        query: USER_CREATE,
        variables: {
          data,
        },
      })
      .pipe(map((res: any) => res));
  }

  updateUser(
    userId: string,
    data: UserDto
  ): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .query({
        query: USER_UPDATE,
        variables: {
          userId,
          data,
        },
      })
      .pipe(map((res: any) => res));
  }
}
