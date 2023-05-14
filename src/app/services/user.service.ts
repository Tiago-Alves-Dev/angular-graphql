import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable, map } from 'rxjs';
import { USER_UPDATE } from '../shared/queries/updateUser.query';
import { USER_CREATE } from '../shared/queries/createUser.query';
import { UserDto } from '../shared/dtos/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly apollo: Apollo) {}

  createUser(data: UserDto): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .mutate({
        mutation: USER_CREATE,
        variables: {
          data,
        },
      })
      .pipe(map((res: any) => res));
  }

  updateUser(userId: string, data: UserDto): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .mutate({
        mutation: USER_UPDATE,
        variables: {
          userId,
          data,
        },
      })
      .pipe(map((res: any) => res));
  }
}
