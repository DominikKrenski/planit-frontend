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
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor(private http:Http, private router: Router) { }

  ngOnInit() {
    function getAuth() {
        return JSON.parse(localStorage.getItem('currentUser'));
    };    
  }

  formSubmit = 0;

  userForm = {
    "LOGIN": "",
    "PASSWORD": "",
    "REPEATED_PASSWORD":"",
    "NAME": "",
    "SURNAME": "",
    "EMAIL": "",
    "GROUP": "",
    "INDEX_NUMBER": "",    
    "START_YEAR": "",
    "INFO": ""
  };

  server = 'http://planit-backend.com:8888/api/user/register';

  save(valid, userForm) {
    if (valid) {
      userForm.INDEX_NUMBER = parseInt(userForm.INDEX_NUMBER, 10);
      userForm.START_YEAR = parseInt(userForm.START_YEAR, 10);

      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.server, userForm, options)
        .subscribe( 
          (res) => {
            this.formSubmit = 2;
            this.userForm.LOGIN = '';
            this.userForm.PASSWORD = '';
            this.userForm.REPEATED_PASSWORD = '';            
            this.userForm.INDEX_NUMBER = '';
            this.userForm.EMAIL = '';
            this.userForm.NAME = '';
            this.userForm.SURNAME = '';
            this.userForm.START_YEAR = '';
            this.userForm.GROUP = '';
            this.userForm.INFO = '';
          },
          err => {
            this.formSubmit = 1;
            this.userForm.LOGIN = '';
            this.userForm.PASSWORD = '';
            this.userForm.REPEATED_PASSWORD = '';            
            this.userForm.INDEX_NUMBER = '';
            this.userForm.EMAIL = '';
            this.userForm.NAME = '';
            this.userForm.SURNAME = '';
            this.userForm.START_YEAR = '';
            this.userForm.GROUP = '';
            this.userForm.INFO = '';
          }
      );
    } else {
      this.formSubmit = 1;
      this.userForm.LOGIN = '';
      this.userForm.PASSWORD = '';
      this.userForm.REPEATED_PASSWORD = '';            
      this.userForm.INDEX_NUMBER = '';
      this.userForm.EMAIL = '';
      this.userForm.NAME = '';
      this.userForm.SURNAME = '';
      this.userForm.START_YEAR = '';
      this.userForm.GROUP = '';
      this.userForm.INFO = '';
      return;
    }
  }
}
