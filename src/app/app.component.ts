import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Subject, Observable } from 'rxjs';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
 } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  authToken = JSON.parse(localStorage.getItem('currentUser'));

  logout() {
    function getAuth() {
        return JSON.parse(localStorage.getItem('currentUser'));
    };

    if(getAuth()) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/']);
      location.reload();
    }
  }
}
