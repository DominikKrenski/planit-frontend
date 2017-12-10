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
export class TagsService {

  constructor(private http:Http) {
  }

  users = [];

  getAllUsers(callback) {
    let url = global.myurl + `tag`;
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
    let url = global.myurl + `tag/` + tag;
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
    let url = global.myurl + `tag/create`;
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
    let url = global.myurl + `tag/accept/` + tag;
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

  rejectThisTag(tag) {
    let url = global.myurl + `tag/reject/` + tag;
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

  rejectTag(tag) {
    this.rejectThisTag(tag);
  }

  editThisTag(tagInfo) {
    let url = global.myurl + `tag/edit/` + tagInfo.ID;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.put(url, tagInfo, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  editTag(tagInfo) {
    this.editThisTag(tagInfo);
  }
}
