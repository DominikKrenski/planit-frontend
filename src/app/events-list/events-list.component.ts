import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service'
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

  date: moment.Moment;
  eventStart: moment.Moment;
  eventEnd: moment.Moment;
  a2eOptionsDate: any;
  a2eOptionsTime: any;

  getAuth() {
      return JSON.parse(localStorage.getItem('currentUser'));
  };  

  constructor(private eventsService:EventsService, private activatedRoute:ActivatedRoute) {
    this.currentUser = this.getAuth();
    this.date = moment();
    this.eventStart = moment();
    this.eventEnd = moment();
    this.a2eOptionsDate = {format: 'DD/MM/YYYY'};
    this.a2eOptionsTime = {format: 'HH:mm'};
  }

  ngOnInit() {
    if(this.getAuth()) {
      this.eventsService.getEvents((events)=>{
        this.events = events;
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

  createEvent = {
    "NAME": "",
    "PLACE": "",
    "TYPE": "",
    "START_DATE": this.date,
    "START_HOUR": this.eventStart,
    "END_HOUR": this.eventEnd,
    "IS_ARCHIVE": false
  }

  dateChange(date) {
    this.date = date;
  }
  starthourChange(eventStart) {
    this.eventStart = eventStart;
  }
  endhourChange(eventEnd) {
    this.eventEnd = eventEnd;
  }

  newEvent(valid, createEvent) {
    createEvent.START_DATE = this.date.format('DD/MM/YYYY');
    createEvent.START_HOUR = this.eventStart.format('HH:mm');
    createEvent.END_HOUR = this.eventEnd.format('HH:mm');
    if(valid) {
      this.eventsService.newEvent(createEvent);
      this.toggleCreate = !this.toggleCreate;
      this.toggleArchive = false;
      this.toggleActive = false;
      this.togglePast = false;
      this.toggleNonAccepted = true;
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
    this.toggleNonAccepted = false;
    this.eventsService.getArchiveEvents((events)=>{
        this.events = events;
      });
  }
  getActiveEvents() {
    this.toggleArchive = false;
    this.toggleActive = true;
    this.togglePast = false;
    this.toggleNonAccepted = false;
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
  acceptEvent(event) {
    this.eventsService.acceptEvent(event.ID);
    var index = this.events.indexOf(event);
    if (index > -1) {
      this.events.splice(index, 1);
    }
  }
  getPastEvents() {
    this.toggleArchive = false;
    this.toggleActive = false;
    this.togglePast = true;
    this.toggleNonAccepted = false;
    this.eventsService.getPastEvents((events)=>{
        this.events = events;
      });
  }
  getNonAcceptedEvents() {
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
