import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Subject, Observable } from 'rxjs';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit() {
  }

  authToken = JSON.parse(localStorage.getItem('currentUser'));

  logout() {
    function getAuth() {
        return JSON.parse(localStorage.getItem('currentUser'));
    };

    if(getAuth()) {
      localStorage.removeItem('currentUser');
      location.reload();
    }
  }
}
