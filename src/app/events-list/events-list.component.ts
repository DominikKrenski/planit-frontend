import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';
import { TagsService } from '../tags-list/tags.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import 'eonasdan-bootstrap-datetimepicker';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  events = [];

  currentUser = "";
  authToken = localStorage.getItem('currentUser');
  newName = '';
  toggleCreate = false;
  toggleActive = true;
  toggleArchive = false;
  togglePast = false;  
  toggleNonAccepted = false;
  info = '';
  tags = [];
  item = [];
  items = [{
    display: "",
    value: ""
  }];

  categories = [
    {name: 'Laboratorium'},
    {name: 'Ćwiczenia'},
    {name: 'Projekt'},
    {name: 'Zaliczenie'},
    {name: 'Wykłady'},
    {name: 'Inne'}
  ];

  date: moment.Moment;
  eventStart: moment.Moment;
  eventEnd: moment.Moment;
  a2eOptionsDate: any;
  a2eOptionsTime: any;
  createEvent = {
    "NAME": "",
    "PLACE": "",
    "TYPE": "",
    "START_DATE": "",
    "START_HOUR": "",
    "END_HOUR": "",
    "IS_ARCHIVE": false,
    "IS_PRIVATE": false
  }

  getAuth() {
      return JSON.parse(localStorage.getItem('currentUser'));
  };  

  constructor(private eventsService:EventsService, private activatedRoute:ActivatedRoute, private tagsService:TagsService) {
    this.currentUser = this.getAuth();
    this.date = moment();
    this.eventStart = moment();
    this.eventEnd = moment();
    this.a2eOptionsDate = {format: 'DD/MM/YYYY'};
    this.a2eOptionsTime = {format: 'HH:mm'};
    this.createEvent.START_DATE = this.date.format('DD/MM/YYYY');
    this.createEvent.START_HOUR = this.date.format('HH:mm');
    this.createEvent.END_HOUR = this.date.format('HH:mm');
  }

  ngOnInit() {
    if(this.getAuth()) {
      this.eventsService.getEvents((events)=>{
        this.events = events;
      });
      this.tagsService.getUsers((tags)=>{
        this.tags = tags;
        for (let i = 0; i < this.tags.length; i++) {
          this.items.push({
            display: this.tags[i].NAME,
            value: this.tags[i].ID
          })
        }
      });
    }
    let eventid = this.activatedRoute.snapshot.params['eventid'];
  };
  
  isAdmin(roles) {
    for(var i=0; i<roles.length; i++) {
      if(roles[i].NAME=="ROLE_ADMIN") {
        return true;
      }
    }    
    return false;
  }

  dateChange(date) {
    this.createEvent.START_DATE = date.format('DD/MM/YYYY');
  }
  starthourChange(eventStart) {
    this.createEvent.START_HOUR = eventStart.format('HH:mm');
  }
  endhourChange(eventEnd) {
    this.createEvent.END_HOUR = eventEnd.format('HH:mm');
  }

  queryTag = [];
  onAddTags(taginfo) {
      this.queryTag.push(taginfo.value);
      let queryTagString = "";
      for (let i = 0; i < this.queryTag.length; i++) {
        if (i + 1 <  this.queryTag.length) queryTagString+=this.queryTag[i]+",";
        else queryTagString+=this.queryTag[i];
      }
      this.eventsService.getEventsByTags((myevents)=>{
        this.events = myevents;
      }, queryTagString);
  }
  onRemoveTags(taginfo) {
    let value = taginfo.value;    
    this.queryTag = this.queryTag.filter(item => item !== value);    
    let queryTagString = "";
    if (this.queryTag.length > 0){
      for (let i = 0; i < this.queryTag.length; i++) {
        if (i + 1 <  this.queryTag.length) queryTagString+=this.queryTag[i]+",";
        else queryTagString+=this.queryTag[i];
      }
      this.eventsService.getEventsByTags((myevents)=>{
        this.events = myevents;
      }, queryTagString);  
    } else {
      this.eventsService.getEvents((events)=>{
        this.events = events;
      });
    }
  }

  infoCreate = false;

  newEvent(valid, createEvent) {
    this.infoCreate = false;
    if(valid) {
      this.eventsService.newEvent(createEvent);
      this.toggleCreate = !this.toggleCreate;
      this.toggleArchive = false;
      this.toggleActive = true;
      this.togglePast = false;
      this.toggleNonAccepted = false;
      this.infoCreate = true;
      this.eventsService.getEvents((events)=>{
        this.events = events;
      });
    }
  }
  getArchiveEvents() {
    this.infoCreate = false;
    this.toggleArchive = true;
    this.toggleActive = false;
    this.togglePast = false;
    this.toggleNonAccepted = false;
    this.eventsService.getArchiveEvents((events)=>{
        this.events = events;
      });
  }
  getActiveEvents() {
    this.infoCreate = false;
    this.toggleArchive = false;
    this.toggleActive = true;
    this.togglePast = false;
    this.toggleNonAccepted = false;
    this.eventsService.getEvents((events)=>{
        this.events = events;
      });
  }
  archiveEvent(event) {
    this.infoCreate = false;
    this.eventsService.archiveEvent(event.ID);
    var index = this.events.indexOf(event);
    if (index > -1) {
      this.events.splice(index, 1);
    }
  }
  acceptEvent(event) {
    this.infoCreate = false;
    this.eventsService.acceptEvent(event.ID);
    var index = this.events.indexOf(event);
    if (index > -1) {
      this.events.splice(index, 1);
    }
  }
  getPastEvents() {
    this.infoCreate = false;
    this.toggleArchive = false;
    this.toggleActive = false;
    this.togglePast = true;
    this.toggleNonAccepted = false;
    this.eventsService.getPastEvents((events)=>{
        this.events = events;
      });
  }
  getNonAcceptedEvents() {
    this.infoCreate = false;
    this.toggleArchive = false;
    this.toggleActive = false;
    this.togglePast = false;
    this.toggleNonAccepted = true;
    this.eventsService.getNonAcceptedEvents((events)=>{
        this.events = events;
      });
  }
  getTags(event) {
    this.eventsService.getTags((tags)=>{
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

    this.eventsService.addTagsToEvent(this.eventObject);

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
  }

  eventObject2 = {
    id: '',
    tagNames: []
  }
  removeTags(event, tags) {
    this.tagsArray = [];
    event.TAGS.forEach(element => {
      if (element.checked == true) {
        this.tagsArray.push(element.NAME);
      }
    });
    this.eventObject2 = {
      id: '',
      tagNames: []
    }
    
    this.eventObject2.id = event.ID;
    this.eventObject2.tagNames = this.tagsArray;

    this.eventsService.removeTagsFromEvent(this.eventObject2);
    
  }  
}
