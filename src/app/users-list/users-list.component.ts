import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service'

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

  getAuth() {
      return JSON.parse(localStorage.getItem('currentUser'));
  };  

  constructor(private usersService:UsersService) {
    this.currentUser = this.getAuth();
  }

  ngOnInit() {
    if(this.getAuth()) {
      this.usersService.getUsers((users)=>{
        this.users = users;
        console.log(this.users);
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
  
  isAdmin(roles) {
    for(var i=0; i<roles.length; i++) {
      if(roles[i].NAME=="ROLE_ADMIN") {
        return true;
      }
    }    
    return false;
  }

  grantToAdmin(user) {
    this.usersService.grantToAdmin(user.ID);
    user.ROLES.push({
      "ID": 1,
      "NAME": "ROLE_ADMIN"
    });
  }
}
