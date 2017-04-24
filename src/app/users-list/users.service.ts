import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {

  constructor() { }

  users = [
    {
      id: 1,
      login: 'Magda',
      role: 'Admin',
    },
    {
      id: 2,
      login: 'Dominik',
      role: 'User',
    }
  ];

  getUsers() {
    return this.users;
  }

}
