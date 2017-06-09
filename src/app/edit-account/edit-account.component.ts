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
  selector: 'edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  currentUser = "";
  authToken = localStorage.getItem('currentUser');

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
    "LOGIN": "",
    "PASSWORD": "",
    "NAME": "",
    "SURNAME": "",
    "EMAIL": "",
    "GROUP": "",
    "INDEX_NUMBER": 0,
    "START_YEAR": 0,
    "INFO": ""
  };  

  server = 'http://planit-backend.com:8888/api/user/update';

  save(valid, userForm) {
    
    if (valid) {
      userForm.INDEX_NUMBER = parseInt(userForm.INDEX_NUMBER, 10);
      userForm.START_YEAR = parseInt(userForm.START_YEAR, 10);

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
          },
          err => {
            this.formSubmit = 1;
          }
      );
    } else {
      this.formSubmit = 1;
      return;
    }
  }
}
