import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service'
import { AccountService } from '../my-account/account.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users = [];

  currentUser = "";
  authToken = localStorage.getItem('currentUser');
  info = '';
  myinfo = {
    ROLES: []
  };
  admin = false;

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

  constructor(private usersService:UsersService, private accountService:AccountService) {
    this.currentUser = this.getAuth();
  }

  ngOnInit() {
    if(this.getAuth()) {
      this.usersService.getUsers((users)=>{
        this.users = users;
      });
      this.accountService.getUserInfo((myinfo)=>{
        this.myinfo = myinfo;
        this.admin = this.isAdmin(this.myinfo.ROLES);
      });
    }    
  };

  removeUser(user) {
    this.usersService.removeUser(user.ID);
    var index = this.users.indexOf(user);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  };

  grantToAdmin(user) {
    this.usersService.grantToAdmin(user.ID);
    user.ROLES.push({
      "ID": 1,
      "NAME": "ROLE_ADMIN"
    });
  }
}
