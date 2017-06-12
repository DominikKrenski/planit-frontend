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
export class TagsService {

  constructor(private http:Http) {
  }

  users = [];

  getAllUsers(callback) {
    let url = `http://planit-backend.com:8888/api/tag`;
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

  removeThisTag(tag) {
    let url = `http://planit-backend.com:8888/api/tag/` + tag;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.delete(url, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  removeTag(tag) {
    this.removeThisTag(tag);
  }

  newTagCreate(tag) {
    let url = `http://planit-backend.com:8888/api/tag/create`;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.post(url, tag, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  newTag(tag) {
    this.newTagCreate(tag);
  }

  acceptThisTag(tag) {
    let url = `http://planit-backend.com:8888/api/tag/accept/` + tag;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.put(url, tag, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  acceptTag(tag) {
    this.acceptThisTag(tag);
  }
}
