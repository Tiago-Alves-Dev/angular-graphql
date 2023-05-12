import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SIGN_IN } from '../queries/sign-in.query';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable, map } from 'rxjs';
import { Constants } from '../config/constants';
import { PayloadDto } from '../dtos/payload.dto';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly apollo: Apollo) {}

  signIn(data: {
    email: string;
    password: string;
  }): Observable<ApolloQueryResult<PayloadDto>> {
    return this.apollo
      .query({
        query: SIGN_IN,
        variables: {
          data,
        },
      })
      .pipe(
        map((res: any) => {
          let currentUser = res.data?.signIn as PayloadDto;
          if (currentUser?.accessToken) {
            localStorage.setItem(
              Constants.currentUser,
              JSON.stringify(currentUser)
            );
          }
          return res;
        })
      );
  }

  logout() {
    localStorage.removeItem(Constants.currentUser);
  }
}