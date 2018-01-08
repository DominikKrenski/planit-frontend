import { Component, OnInit } from '@angular/core';
import { EventDetailService } from './event-detail.service'
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
 } from '@angular/router';

import { Subject, Observable } from 'rxjs';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import * as moment from 'moment';
import 'eonasdan-bootstrap-datetimepicker';
import {global} from "../../app/global";
import { AccountService } from '../my-account/account.service';

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  currentUser = "";
  authToken = localStorage.getItem('currentUser');
  event = {};
  userForm = {
    "NAME": "",
    "PLACE": "",
    "TYPE": "",
    "START_DATE": "",
    "START_HOUR": "",
    "END_HOUR": "",
    "IS_PRIVATE": false,
    "IS_IMPORTANT": false
  }; 
  categories = [
    {name: 'Laboratorium'},
    {name: 'Ćwiczenia'},
    {name: 'Projekt'},
    {name: 'Zaliczenie'},
    {name: 'Wykłady'},
    {name: 'Inne'}
  ];

  server = '';
  admin = false;
  myinfo = {
    ROLES: []
  };

  getAuth() {
      return JSON.parse(localStorage.getItem('currentUser'));
  };  

  constructor (
    private eventDetailService:EventDetailService, 
    private activatedRoute:ActivatedRoute, 
    private http:Http,
    private accountService:AccountService
  ) {
    this.currentUser = this.getAuth();
    this.date = moment();
    this.eventStart = moment();
    this.eventEnd = moment();
    this.a2eOptionsDate = {format: 'DD/MM/YYYY'};
    this.a2eOptionsTime = {format: 'HH:mm'};
    this.accountService.getUserInfo((myinfo)=>{
      this.myinfo = myinfo;
      this.admin = this.isAdmin(this.myinfo.ROLES);
    });
  }

  isAdmin(roles) {
    for(var i=0; i<roles.length; i++) {
      if(roles[i].NAME=="ROLE_ADMIN") {
        return true;
      }
    }    
    return false;
  }

  tags = [];
  getTags(event) {
      this.eventDetailService.getTags((tags)=>{
        this.tags = tags;
        for (var i = this.tags.length -1; i >= 0; i--) {
          event.TAGS.forEach(element => {
            if(this.tags[i]) {
              if(element.ID == this.tags[i].ID) {
                var index = i;
                if (index > -1) {
                  this.tags.splice(index, 1);
                }
              }
            }
          });
        }
    });
  }
  ngOnInit() {
    let eventid = this.activatedRoute.snapshot.params['eventid'];
    if(this.getAuth()) {
       this.eventDetailService.getEvents(eventid, (events)=>{
        this.event = events;
        this.getTags(this.event);
        this.userForm.NAME = this.event['NAME'];
        this.userForm.PLACE = this.event['PLACE'];
        this.userForm.TYPE = this.event['TYPE'];
        this.userForm.START_DATE = this.event['START_DATE'];
        this.userForm.START_HOUR = this.event['START_HOUR'];
        this.userForm.END_HOUR = this.event['END_HOUR'];
        this.userForm.IS_PRIVATE = this.event['IS_PRIVATE'];
        this.userForm.IS_IMPORTANT = this.event['IS_IMPORTANT'];
      });
    }
    this.server = global.myurl + 'event/' + eventid;
  };
  
  acceptEvent(event) {
    this.eventDetailService.acceptEvent(event.ID);
    event.IS_ACCEPTED = true;
  }
  revokeAcceptEvent(event) {
    this.eventDetailService.revokeAcceptEvent(event.ID);
    event.IS_ACCEPTED = false;
  }
  importantEvent(event) {
    this.eventDetailService.importantEvent(event.ID);
    event.IS_IMPORTANT = true;
  }
  revokeImportantEvent(event) {
    this.eventDetailService.revokeImportantEvent(event.ID);
    event.IS_IMPORTANT = false;
  }
  privateEvent(event) {
    this.eventDetailService.privateEvent(event.ID);
    event.IS_PRIVATE = true;
  }
  revokePrivateEvent(event) {
    this.eventDetailService.revokePrivateEvent(event.ID);
    event.IS_PRIVATE = false;
  }

  tagsArray = [];
  eventObject = {
    id: '',
    tagsIds: []
  }
  currentAddTags = [];
  addTags(event, tags) {
    this.tagsArray = [];
    tags.forEach(element => {
      if (element.checked == true) {
        this.tagsArray.push(element.ID);
      }
    });
    this.eventObject = {
      id: '',
      tagsIds: []
    }
    
    this.eventObject.id = event.ID;
    this.eventObject.tagsIds = this.tagsArray;

    this.eventDetailService.addTagsToEvent(this.eventObject);

    this.tags.forEach(element => {
      this.eventObject.tagsIds.forEach(el => {
        if(element.ID == el) {
          event.TAGS.push(element);
        }
      });
    });

    for (var i = 0; i < this.tags.length; i++) {
      event.TAGS.forEach(element => {
        if(element.ID == this.tags[i].ID) {
          var index = i;
          if (index > -1) {
            this.tags.splice(index, 1);
          }
        }
      });
    }
    for (var i=event.TAGS.length -1; i >=0; i--) {
      event.TAGS[i].checked = false;
    }
  }

  eventObject2 = {
    id: '',
    tagNames: []
  }
  tagsIdArray=[];
  removeTags(event, tags) {
    this.tagsArray = [];
    this.tagsIdArray = [];
    event.TAGS.forEach(element => {
      if (element.checked) {
        this.tagsArray.push(element.NAME);
        this.tagsIdArray.push(element.ID);
      }
    });
    this.eventObject2 = {
      id: '',
      tagNames: []
    }
    
    this.eventObject2.id = event.ID;
    this.eventObject2.tagNames = this.tagsArray;

    this.eventDetailService.removeTagsFromEvent(this.eventObject2);
    event.TAGS.forEach(element => {
      this.tagsIdArray.forEach(el => {
        if(element.ID == el) {
          this.tags.push(element);
        }
      });
    });

    for (var i = 0; i < event.TAGS.length; i++) {
      this.tags.forEach(element => {
        if(element.ID == event.TAGS[i].ID) {
          var index = i;
          if (index > -1) {
            event.TAGS.splice(index, 1);
          }
        }
      });
    }


    for (var i=this.tags.length -1; i >=0; i--) {
      this.tags[i].checked = false;
    }
  }
  
  editToggle = false;
  formSubmit = 0;

  

  save(valid, userForm, event) {
    
    if (valid) {
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
            this.editToggle = false;
            event.NAME = userForm.NAME;
            event.PLACE = userForm.PLACE;
            event.TYPE = userForm.TYPE;
            event.START_DATE = userForm.START_DATE;
            event.START_HOUR = userForm.START_HOUR;
            event.END_HOUR = userForm.END_HOUR;
            this.formSubmit = 2;
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

  date: moment.Moment;
  eventStart: moment.Moment;
  eventEnd: moment.Moment;
  a2eOptionsDate: any;
  a2eOptionsTime: any;

  dateChange(date) {
    this.date = date;
  }
  starthourChange(eventStart) {
    this.eventStart = eventStart;
  }
  endhourChange(eventEnd) {
    this.eventEnd = eventEnd;
  }

}
