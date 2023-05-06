import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlertService } from '../services/alert.service';

@Injectable()
export class CustomHttp extends HttpClient {

  constructor(handler: HttpHandler, private alertService: AlertService) {
    super(handler);
  }

  override get(url: string, options: any): Observable<any> {
    return super.get(environment.API_URL + url, options).pipe(catchError(this.handleError));
  }

  override post(url: string, body: string, options: any): Observable<any> {
    return super.post(environment.API_URL + url, body, options).pipe(catchError(this.handleError));
  }

  override put(url: string, body: string, options: any): Observable<any> {
    return super.put(environment.API_URL + url, body, options).pipe(catchError(this.handleError));
  }

  override delete(url: string, options: any): Observable<any> {
    return super.delete(environment.API_URL + url, options).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return observableThrowError(error);
  }
}

export function customHttpFactory(handler: HttpHandler, alertService: AlertService): HttpClient {
  return new CustomHttp(handler, alertService);
}

export let customHttpProvider = {
  provide: HttpClient,
  useFactory: customHttpFactory,
  deps: [HttpHandler, AlertService]
};
