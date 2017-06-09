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
  };
  

  save(valid, userForm) {
    
  }
}
