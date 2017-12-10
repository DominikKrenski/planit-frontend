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
import { AccountService } from '../my-account/account.service';
import {global} from "../../app/global";

@Component({
  selector: 'edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  currentUser = "";
  myInfo = {};
  myinfo = {};

  authToken = localStorage.getItem('currentUser');
  userForm = {
    "AVATAR": "",
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

  getAuth() {
      return JSON.parse(localStorage.getItem('currentUser'));
  }; 
  serverUser ="";
  getUser() {
    this.serverUser = global.myurl + 'user/update';

    let authToken = localStorage.getItem('currentUser');    
    let token = JSON.parse(authToken);
    let headers = new Headers();
        headers.append('Authorization', `${token.authorization}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

      return this.http.get(this.serverUser, options)
        .subscribe( 
          (res) => {
            let data = res.json();
            this.myInfo = data;
            this.userForm.AVATAR = this.myInfo['AVATAR'];
            this.userForm.LOGIN = this.myInfo['LOGIN'];
            this.userForm.NAME = this.myInfo['NAME'];
            this.userForm.SURNAME = this.myInfo['SURNAME'];
            this.userForm.EMAIL = this.myInfo['EMAIL'];
            this.userForm.GROUP = this.myInfo['GROUP'];
            this.userForm.INDEX_NUMBER = this.myInfo['INDEX_NUMBER'];
            this.userForm.START_YEAR = this.myInfo['START_YEAR'];
            this.userForm.INFO = this.myInfo['INFO'];
          },
          err => {
            this.formSubmit = 1;
          }
      );
  }

  constructor(private http:Http, private router: Router, private accountService:AccountService) {
    this.currentUser = this.getAuth();
  }

  ngOnInit() {
    function getAuth() {
        return JSON.parse(localStorage.getItem('currentUser'));
    };  
    this.getUser();
    if(this.getAuth()) {
      this.accountService.getUserInfo((myinfo)=>{
        this.myinfo = myinfo;
      });
    }
  }

  formSubmit = 0;

  server = global.myurl + 'user/update';

  save(valid, userForm) {
    if(this.base64textString!=null) {
      userForm.AVATAR = 'data:image/png;base64,'+this.base64textString;
    }
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
            if(this.getAuth()) {
              this.accountService.getUserInfo((myinfo)=>{
                this.myinfo = myinfo;
              });
            }
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

  private base64textString:String="";
  nameOfFile = "Wczytaj avatar";
  
  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];
    this.nameOfFile = file.name;
    
    if (files && file) {
        var reader = new FileReader();
        reader.onload =this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
    }
}
