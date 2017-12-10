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
import {global} from "../../app/global";

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnInit {

  formSubmit = 0;
  
  userForm = {
    "login": ""
  };

  constructor(private http:Http, private router: Router) { }

  ngOnInit() {
  }

  server = global.myurl + 'user/restore-password';
  
  save(valid, userForm) {
    if (valid) {
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      let options = new RequestOptions({ headers: headers });
      let myLogin = userForm.login;

      return this.http.get(this.server+ '?login='+myLogin, options)
        .subscribe( 
          (res) => {
            this.formSubmit = 2;
          },
          err => {
            this.formSubmit = 1;
            this.userForm.login = '';
          }
      );
    } else {
      this.formSubmit = 1;
      this.userForm.login = '';
      return;
    }
  }

}
