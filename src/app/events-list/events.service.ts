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
export class EventsService {

  constructor(private http:Http) {
  }

  events = [];

  getAllEvents(callback) {
    let url = global.myurl + `event/active`;
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
    let url = global.myurl + `event/create`;
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
    let url = global.myurl + `event/archive`;
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
    let url = global.myurl + `event/set-archive/` + event;
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

  getAllPastEventsAdmin(callback) {
    let url = global.myurl + `event/past-admin`;
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

  getPastEventsAdmin(callback) {
    this.getAllPastEventsAdmin(callback);
  }

  getAllPastEvents(callback) {
    let url = global.myurl + `event/past`;
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

  getAllNonAcceptedEvents(callback) {
    let url = global.myurl + `event/not-accepted`;
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

  getNonAcceptedEvents(callback) {
    this.getAllNonAcceptedEvents(callback);
  }

  getAllNonAcceptedEventsAdmin(callback) {
    let url = global.myurl + `event/not-accepted-admin`;
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

  getNonAcceptedEventsAdmin(callback) {
    this.getAllNonAcceptedEventsAdmin(callback);
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


  getAllEventsByTags(callback, tags) {
    

    let url = global.myurl + `event/by-tags`;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.get(url + '?ids='+tags, options).subscribe((response:Response)=>{
      let data = response.json();
      let events = data;
      callback(events);
    });
  }

  getEventsByTags(callback, tags) {
    this.getAllEventsByTags(callback, tags);
  }
}
