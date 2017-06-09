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
    "login": "",
    "password": "",
    "repeated_password":"",
    "index_number": "",
    "email": "",
    "name": "",
    "surname": "",
    "start_year": "",
    "group": "",
    "info": ""
  };

  userForm2 = {
    "ROLES": [
      {
        "ID": 2,
        "NAME": "ROLE_STUDENT"
      }
    ],
    "ID": 5,
    "LOGIN": "Magdalena",
    "PASSWORD": "asdfASDF1234!@#$",
    "REPEATED_PASSWORD": "asdfASDF1234!@#$",
    "NAME": "Magda",
    "SURNAME": "Mrzyglocka",
    "EMAIL": "magmrzyg@student.pg.gda.pl",
    "GROUP": "2",
    "INDEX_NUMBER": 158068,
    "START_YEAR": 2014,
    "INFO": "Lubię koty"
  };

  server = 'http://planit-backend.com:8888/api/user/register';

  save(valid, userForm) {
    console.log(userForm);
    if (valid) {
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.server, userForm, options)
        .subscribe( 
          (res) => {
            console.log('ok');
          },
          err => {
            this.formSubmit = 1;
            this.userForm.login = '';
            this.userForm.password = '';
            this.userForm.repeated_password = '';            
            this.userForm.index_number = '';
            this.userForm.email = '';
            this.userForm.name = '';
            this.userForm.surname = '';
            this.userForm.start_year = '';
            this.userForm.group = '';
            this.userForm.info = '';
          }
      );
    } else {
      this.formSubmit = 1;
      this.userForm.login = '';
      this.userForm.password = '';
      this.userForm.repeated_password = '';  
      this.userForm.index_number = '';
      this.userForm.email = '';
      this.userForm.name = '';
      this.userForm.surname = '';
      this.userForm.start_year = '';
      this.userForm.group = '';
      this.userForm.info = '';
      return;
    }
  }
}
