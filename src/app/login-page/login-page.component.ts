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
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private http:Http, private router: Router) { }

  ngOnInit() {
    function getAuth() {
        return JSON.parse(localStorage.getItem('currentUser'));
    };    
  }

  formSubmit = 0;

  userForm = {
    "login": "",
    "password": ""
  };

  server = 'http://planit-backend.com:8888/api/user/login';

  save(valid, userForm) {
    if (valid) {
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.server, userForm, options)
        .subscribe( 
          (res) => {
            var headers = res.headers.toJSON();
            var authorization = headers['authorization'][0];
            localStorage.setItem('currentUser', JSON.stringify({ authorization }));
            this.router.navigate(['/']);
            location.reload();
          },
          err => {
            this.formSubmit = 1;
            this.userForm.login = '';
            this.userForm.password = '';
          }
      );
    } else {
      this.formSubmit = 1;
      this.userForm.login = '';
      this.userForm.password = '';
      return;
    }
  }
}
