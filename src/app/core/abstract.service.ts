import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class AbstractService<T> {

  private sHttp: HttpClient;

  constructor(http: HttpClient) {
    this.sHttp = http;
  }

  abstract getURLBase(): string;

  get(url:string): Observable<any> {
    return this.sHttp.get(this.getURLBase() + url);
  }

  post(url:string, obj:any): Observable<any> {
    return this.sHttp.post(this.getURLBase() + url, obj);
  }

  put(url:string, obj:any): Observable<any> {
    return this.sHttp.put(this.getURLBase() + url, obj);
  }

  getAll(url:string): Observable<T[]> {
    return this.sHttp.get<T[]>(this.getURLBase() + url);
  }

  getById(id: string): Observable<T> {
    return this.sHttp.get<T>(this.getURLBase() + id);
  }

  delete(id: string): Observable<void> {
    return this.sHttp.delete<void>(this.getURLBase() + '/' + id);
  }

}
