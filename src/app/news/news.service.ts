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
export class NewsService {

  constructor(private http:Http) {
  }

  news = [];

  getAllNews(callback) {
    let url = global.myurl + `notification/all`;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.get(url, options).subscribe((response:Response)=>{
      let data = response.json();
      let news = data;
      callback(news);
    });
  }

  getNews(callback) {
    this.getAllNews(callback);
  }

  newNewsCreate(news) {
    let url = global.myurl + `notification/create`;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.post(url, news, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  newNews(news) {
    this.newNewsCreate(news);
  }

  removeThisNews(news) {
    let url = global.myurl + `notification/delete`;
    let authToken = localStorage.getItem('currentUser');
   
    let token = JSON.parse(authToken);

    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    this.http.delete(url + '?id='+news, options).subscribe((response:Response)=>{
      let data = response.json();
    });
  }

  removeNews(news) {
    this.removeThisNews(news);
  }
}
