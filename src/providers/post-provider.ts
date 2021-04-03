import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class PostProvider {
  server = environment.url;
  // directory folder, default local host
  // server: string = 'http://backboneinnovation.com/' //directory folder, default local host
  constructor(
    public http: Http
  ) {}

  postData(body, file) {
    const type = 'application/json; charset=UTF-8';
    const headers = new Headers({ 'Content-Type': type });
    const options = new RequestOptions({ headers });
    return this.http.post(this.server + file, JSON.stringify(body), options)
    .map(res => res.json())
    .pipe(catchError(this.errorHandler));
  }

  async errorHandler(error) {
    alert('Connection timeout. Please try again later.!');
    return throwError('Something bad happened; please try again later.');
  }
}