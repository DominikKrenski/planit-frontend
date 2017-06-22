import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service'

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

  categories = [
    {name: 'Laboratorium'},
    {name: 'Ćwiczenia'},
    {name: 'Projekt'},
    {name: 'Zaliczenie'},
    {name: 'Wykłady'},
    {name: 'Inne'}
  ];

  options = {
      format: "DD.MM.YYYY"
  };

  getAuth() {
      return JSON.parse(localStorage.getItem('currentUser'));
  };  

  constructor(private eventsService:EventsService) {
    this.currentUser = this.getAuth();
  }

  ngOnInit() {
    if(this.getAuth()) {
      this.eventsService.getEvents((events)=>{
        this.events = events;
      });
    }    
  };
  
  isAdmin(roles) {
    for(var i=0; i<roles.length; i++) {
      if(roles[i].NAME=="ROLE_ADMIN") {
        return true;
      }
    }    
    return false;
  }

  createEvent = {
    "NAME": "",
    "PLACE": "",
    "TYPE": "",
    "START_DATE": "",
    "START_HOUR": "",
    "END_HOUR": "",
    "IS_ARCHIVE": false
  }
  newEvent(valid, createEvent) {
    if(valid) {
      this.eventsService.newEvent(createEvent);
      this.toggleCreate = !this.toggleCreate;
      this.events.push({
        "NAME": createEvent.NAME,
        "PLACE": createEvent.PLACE,
        "TYPE": createEvent.TYPE,
        "START_DATE": createEvent.START_DATE,
        "START_HOUR": createEvent.START_HOUR,
        "END_HOUR": createEvent.END_HOUR,
        "IS_ARCHIVE": false
      });
    }
  }
  getArchiveEvents() {
    this.toggleArchive = true;
    this.toggleActive = false;
    this.togglePast = false;
    this.eventsService.getArchiveEvents((events)=>{
        this.events = events;
      });
  }
  getActiveEvents() {
    this.toggleArchive = false;
    this.toggleActive = true;
    this.togglePast = false;
    this.eventsService.getEvents((events)=>{
        this.events = events;
      });
  }
  archiveEvent(event) {
    this.eventsService.archiveEvent(event.ID);
    var index = this.events.indexOf(event);
    if (index > -1) {
      this.events.splice(index, 1);
    }
  }
   getPastEvents() {
    this.toggleArchive = false;
    this.toggleActive = false;
    this.togglePast = true;
    this.eventsService.getPastEvents((events)=>{
        this.events = events;
      });
  }
}
