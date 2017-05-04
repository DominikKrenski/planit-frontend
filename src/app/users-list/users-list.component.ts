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

  if(authToken) {
    console.log('x');
    this.currentUser = "A";
  };
  
  constructor(private usersService:UsersService) {
  }

  ngOnInit() {
    this.usersService.getUsers((users)=>{
      this.users = users;
    });
  }
}
