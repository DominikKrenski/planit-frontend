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
 import { AccountService } from './my-account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  authToken = JSON.parse(localStorage.getItem('currentUser'));
  myinfo = {
    ROLES: []
  };
  admin = false;
  togglemenu = true;

  isAdmin(roles) {
    for(var i=0; i<roles.length; i++) {
      if(roles[i].NAME=="ROLE_ADMIN") {
        return true;
      }
    }    
    return false;
  }
  
  getAuth() {
      return this.authToken;
  };

  constructor(private router: Router, private accountService:AccountService) { }

  ngOnInit() {
    if(this.getAuth()) {
      this.accountService.getUserInfo((myinfo)=>{
        this.myinfo = myinfo;
        this.admin = this.isAdmin(this.myinfo.ROLES);
      });
    }
  }

  logout() {
    if(this.getAuth()) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/']);
      location.reload();
    }
  }

  toggleMenu() {
    this.togglemenu = !this.togglemenu;
  }
}
