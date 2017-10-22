import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule,HttpHeaders} from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';

import { ReplaySubject,Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {SERVER_URL} from " ../../../config";
import {User} from '../models/user';
@Injectable()
export class AuthenticationService {
    public token: string;
    authUser = new ReplaySubject<any>(1);
    private headers: HttpHeaders;
    constructor(private http: Http) {
        // set token if saved in local storage
        console.log("localStorage:"+ localStorage.getItem('currentUser'));
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    }

    // login(username: string, password: string): Observable<boolean> {
    //     //return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
    //     console.log("login URL:"+`${SERVER_URL}/login`);
    //     return this.http.post(`${SERVER_URL}/login`, JSON.stringify({ username: username, password: password }))
    //         .map((response: Response) => {
    //             // login successful if there's a jwt token in the response
    //             let token = response.json() && response.json().token;
    //             if (token) {
    //                 // set token property
    //                 this.token = token;

    //                 // store username and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

    //                 // return true to indicate successful login
    //                 return true;
    //             } else {
    //                 // return false to indicate failed login
    //                 return false;
    //             }
    //         });
    // }
    login(user:User): Observable<boolean> {
        console.log("login URL:"+`${SERVER_URL}/login`);
        console.log("UserName:"+user.username);
        console.log("Password:"+user.password);
         
        return this.http.post(`${SERVER_URL}/login`, user)
        .map((response:Response) =>{
            let token = response.text()
            //let token = response.json() && response.json().token;
            console.log("TOKEN:"+token);
            if (token) {
             // set token property
             this.token = token;
             localStorage.setItem('currentUser', JSON.stringify({ username: user.username, token: token }));
             return true;
            } else {
                console.log("user password error!!");
                return false;
            }


        })

    }

    private handleJwtResponse(jwt: string) {
        return localStorage.setItem('currentUser', jwt);
      }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}