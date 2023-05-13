import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/config/constants';

@Injectable()
export class JwtService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUser = JSON.parse(localStorage.getItem(Constants.currentUser)!);
    if (currentUser && currentUser.accessToken) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${currentUser.accessToken}` },
      });
    }
    return next.handle(req);
  }
}
