import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service'

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private usersService:UsersService) {
    this.users = this.usersService.getUsers();
  }

  ngOnInit() {
  }

  users = [];

}
