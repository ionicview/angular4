import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AuthenticationService } from './authentication.service';
import { User } from '../models/User';
import { SERVER_URL } from "../../../../config";

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authHttp: AuthHttp,
        private authenticationService: AuthenticationService) {
    }

    //    getUsers(): Observable<User[]> {
    getUsers(): Observable<User> {
        // add authorization header with jwt token
        // let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        // let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.authHttp.get(`${SERVER_URL}/secret`)
            .map((response: Response) => response.json());


    }
}