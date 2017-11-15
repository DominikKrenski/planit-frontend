import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';

@Component({
  selector: 'my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  currentUser = "";
  authToken = localStorage.getItem('currentUser');
  myinfo = {};

  getAuth() {
      return JSON.parse(localStorage.getItem('currentUser'));
  }; 

  constructor(private accountService:AccountService) {
    this.currentUser = this.getAuth();
  }

  ngOnInit() {
    if(this.getAuth()) {
      this.accountService.getUserInfo((myinfo)=>{
        this.myinfo = myinfo;
      });
    }  
  }

}
