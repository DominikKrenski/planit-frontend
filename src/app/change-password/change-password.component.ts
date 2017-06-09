import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
 } from '@angular/router';

import { Subject, Observable } from 'rxjs';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  currentUser = "";
  authToken = localStorage.getItem('currentUser');
  myinfo = {}

  getAuth() {
      return JSON.parse(localStorage.getItem('currentUser'));
  }; 
  constructor(private http:Http, private router: Router) {
    this.currentUser = this.getAuth();
  }

  ngOnInit() {
    function getAuth() {
        return JSON.parse(localStorage.getItem('currentUser'));
    };    
  }

  formSubmit = 0;

  userForm = {
    "OLD_PASSWORD": "",
    "NEW_PASSWORD": "",
    "NEW_PASSWORD_CONFIRM": ""
  };

  server = 'http://planit-backend.com:8888/api/user/change-password';

  save(valid, userForm) {
    
    if (valid) {
      let authToken = localStorage.getItem('currentUser');
    
      let token = JSON.parse(authToken);

      let headers = new Headers();
          headers.append('Authorization', `${token.authorization}`);
          headers.append('Accept', 'application/json');
          headers.append('Content-Type', 'application/json');

      let options = new RequestOptions({ headers: headers });

      return this.http.put(this.server, userForm, options)
        .subscribe( 
          (res) => {
            this.formSubmit = 2;
            this.userForm.OLD_PASSWORD = '';
            this.userForm.NEW_PASSWORD = '';
            this.userForm.NEW_PASSWORD_CONFIRM = '';
          },
          err => {
            this.formSubmit = 1;
            this.userForm.OLD_PASSWORD = '';
            this.userForm.NEW_PASSWORD = '';
            this.userForm.NEW_PASSWORD_CONFIRM = '';
          }
      );
    } else {
      this.formSubmit = 1;
      this.userForm.OLD_PASSWORD = '';
      this.userForm.NEW_PASSWORD = '';
      this.userForm.NEW_PASSWORD_CONFIRM = '';
      return;
    }
  }
}
