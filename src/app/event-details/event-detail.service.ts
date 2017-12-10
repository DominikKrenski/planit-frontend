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
export class EventDetailService {

  constructor(private http:Http) {
  }

  events = [];

  getAllEvents(eventid, callback) {
    let url = global.myurl + `event/` + eventid;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.get(url, options).subscribe((response:Response)=>{
      let data = response.json();
      let events = data;
      callback(events);
    });
  }

  getEvents(eventid, callback) {
    this.getAllEvents(eventid, callback);
  }

  acceptThisEvent(event) {
    let url = global.myurl + `event/set-accepted/` + event;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.put(url, event, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  acceptEvent(event) {
    this.acceptThisEvent(event);
  }

  revokeAcceptThisEvent(event) {
    let url = global.myurl + `event/revoke-accepted/` + event;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.put(url, event, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  revokeAcceptEvent(event) {
    this.revokeAcceptThisEvent(event);
  }


  importantThisEvent(event) {
    let url = global.myurl + `event/set-important/` + event;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.put(url, event, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  importantEvent(event) {
    this.importantThisEvent(event);
  }

  revokeImportantThisEvent(event) {
    let url = global.myurl + `event/revoke-important/` + event;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.put(url, event, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  revokeImportantEvent(event) {
    this.revokeImportantThisEvent(event);
  }

  privateThisEvent(event) {
    let url = global.myurl + `event/set-private/` + event;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.put(url, event, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  privateEvent(event) {
    this.privateThisEvent(event);
  }

  revokePrivateThisEvent(event) {
    let url = global.myurl + `event/revoke-private/` + event;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.put(url, event, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  revokePrivateEvent(event) {
    this.revokePrivateThisEvent(event);
  }

  tags = [];
  getAllTags(callback) {
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
      let tags = data;
      callback(tags);
    });
  }

  getTags(callback) {
    this.getAllTags(callback);
  }

   addTagsToThisEvent(eventObject) {
    let url = global.myurl + `event/add-tags/` + eventObject.id;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.put(url, eventObject.tagsIds, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  addTagsToEvent(eventObject) {
    this.addTagsToThisEvent(eventObject);
  }

  removeTagsFromThisEvent(eventObject) {
    let url = global.myurl + `event/remove-tags/` + eventObject.id;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.put(url, eventObject.tagNames, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  removeTagsFromEvent(eventObject) {
    this.removeTagsFromThisEvent(eventObject);
  }
}
