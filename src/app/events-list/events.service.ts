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
export class EventsService {

  constructor(private http:Http) {
  }

  events = [];

  getAllEvents(callback) {
    let url = `http://planit-backend.com:8888/api/event/active`;
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

  getEvents(callback) {
    this.getAllEvents(callback);
  }

  newEventCreate(event) {
    let url = `http://planit-backend.com:8888/api/event/create`;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.post(url, event, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  newEvent(event) {
    this.newEventCreate(event);
  }


  getAllArchiveEvents(callback) {
    let url = `http://planit-backend.com:8888/api/event/archive`;
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

  getArchiveEvents(callback) {
    this.getAllArchiveEvents(callback);
  }

  archiveThisEvent(event) {
    let url = `http://planit-backend.com:8888/api/event/set-archive/` + event;
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

  archiveEvent(event) {
    this.archiveThisEvent(event);
  }

  getAllPastEvents(callback) {
    let url = `http://planit-backend.com:8888/api/event/past`;
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

  getPastEvents(callback) {
    this.getAllPastEvents(callback);
  }
}
