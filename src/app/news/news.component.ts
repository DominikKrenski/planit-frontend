import { Component, OnInit } from '@angular/core';
import { AccountService } from '../my-account/account.service';

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
  

  constructor(private accountService:AccountService) {
    this.currentUser = this.getAuth();
    this.accountService.getUserInfo((myinfo)=>{
      this.myinfo = myinfo;
      this.admin = this.isAdmin(this.myinfo.ROLES);
    });
  }

  ngOnInit() {
    if(this.getAuth()) {
      this.accountService.getUserInfo((myinfo)=>{
        this.myinfo = myinfo;
        this.admin = this.isAdmin(this.myinfo.ROLES);
      });
    }    
  };
  createNews = {
    "NAME": "",
    "CONTENT": ""
  }
  newTag(valid, createTag) {
    if(valid) {
      this.news.push({
        "NAME": createTag.NAME,
        "CONTENT": createTag.CONTENT
      });
    }
  }
}