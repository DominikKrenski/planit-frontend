import { Injectable } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
 } from '@angular/router';

import { Subject, Observable } from 'rxjs';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {global} from "../../app/global";

@Component({providers: [Http]})
@Injectable()
export class AccountService {

  constructor(private http:Http) {
  }

  users = [];

  getMyUserInfo(callback) {
    let url = global.myurl + `user/update`;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.get(url, options).subscribe((response:Response)=>{
      let data = response.json();
      let users = data;
      callback(users);
    });
  }

  getUserInfo(callback) {
    this.getMyUserInfo(callback);
  }

}
