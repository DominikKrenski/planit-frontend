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
export class CalendarListService {

  constructor(private http:Http) {
  }

  events = [];

  getAllEvents(callback, startDate, endDate) {
    

    let url = `http://planit-backend.com:8888/api/event/date`;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.get(url + '?start='+startDate+'&end='+endDate, options).subscribe((response:Response)=>{
      let data = response.json();
      let events = data;
      callback(events);
    });
  }

  getEvents(callback, startDate, endDate) {
    this.getAllEvents(callback, startDate, endDate);
  }
}
