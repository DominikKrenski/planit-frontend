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

@Component({providers: [Http]})
@Injectable()
export class UsersService {

  constructor(private http:Http) {
  }

  users = [];

  getAllUsers(callback) {
    let url = `http://planit-backend.com:8888/api/admin/user`;
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

  getUsers(callback) {
    this.getAllUsers(callback);
  }

  removeThisUser(userId) {
    let url = `http://planit-backend.com:8888/api/admin/user/delete/` + userId;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.get(url, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  removeUser(userId) {
    this.removeThisUser(userId);
  }

  grantThisUserToAdmin(userId) {
    let url = `http://planit-backend.com:8888/api/admin/user/grant/` + userId;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.get(url, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  grantToAdmin(userId) {
    this.grantThisUserToAdmin(userId);
  }
}