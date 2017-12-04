import { Component, OnInit } from '@angular/core';
import { AccountService } from '../my-account/account.service';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  authToken = localStorage.getItem('currentUser');
  admin = false;
  currentUser = {};
  myinfo = {
    ROLES: []
  };
  news = [];

  getAuth() {
    return JSON.parse(localStorage.getItem('currentUser'));
  };  

  isAdmin(roles) {
    for(var i=0; i<roles.length; i++) {
      if(roles[i].NAME=="ROLE_ADMIN") {
        return true;
      }
    }    
    return false;
  }
  

  constructor(
      private accountService:AccountService,
      private newsService:NewsService
  ) {
    this.currentUser = this.getAuth();
  }

  ngOnInit() {
    if(this.getAuth()) {
      this.accountService.getUserInfo((myinfo)=>{
        this.myinfo = myinfo;
        this.admin = this.isAdmin(this.myinfo.ROLES);
      });
      this.newsService.getNews((news)=>{
        this.news = news;
      });
    }    
  };

  createNews = {
    "TITLE": "",
    "NOTIFICATION": ""
  }
  newNews(valid, createNews) {
    if(valid) {
      this.newsService.newNews(createNews);
      this.news.push({
        "TITLE": createNews.TITLE,
        "NOTIFICATION": createNews.NOTIFICATION
      });
    }
  }

  removeNews(thisnew) {
    this.newsService.removeNews(thisnew.ID);
    var index = this.news.indexOf(thisnew);
    if (index > -1) {
      this.news.splice(index, 1);
    }
  };
}