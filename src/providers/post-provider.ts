// providers api
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';
import { CommonService } from '../app/common.service';
import { Observable, throwError } from 'rxjs';


@Injectable()
export class PostProvider {
server: string = "http://150.129.107.10:8091/ionic_code/login/server_api_mssql/" //directory folder, default local host
//server: string = "http://backboneinnovation.com/" //directory folder, default local host

	constructor(public http: Http,
		private cs: CommonService){
	}

	postData(body, file) {
		let type = "application/json; charset=UTF-8";
		let headers = new Headers({ 'Content-Type': type });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this.server + file, JSON.stringify(body), options)
			.map(res => res.json())
		    .pipe(catchError(this.errorHandler));
	}

	async errorHandler(error) {
		//this.cs.hideLoader();
		//console.log(error);
		alert("Connection timeout. Please try again later.!");
    	return throwError('Something bad happened; please try again later.');
  	}

}