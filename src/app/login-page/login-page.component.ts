import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Subject, Observable } from 'rxjs';
import 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private http:Http) { }

  ngOnInit() {
  }

  formSubmit = 0;

  userForm = {
    "login": "",
    "password": ""
  };

  server = 'http://planit-backend.com:8888/api/user/login';

  save(valid, userForm) {
    
    if (valid) {
      console.log(userForm);

      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Headers', 'Content-Type');
      headers.append('Access-Control-Allow-Methods', 'POST');
      headers.append('Access-Control-Allow-Origin', '*');
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.server, userForm, options)
        .map(res => res.json())
        .subscribe(
          data => userForm = data,
          err => console.log('ERROR!!!'),
          () => console.log('Got response from API', userForm)
        );
      

    } else {
      this.formSubmit = 1;
      return;
    }
  }

}
