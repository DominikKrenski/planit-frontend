import { Component, OnInit } from '@angular/core';
import { EventDetailService } from './event-detail.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  currentUser = "";
  authToken = localStorage.getItem('currentUser');
  event = {};

  getAuth() {
      return JSON.parse(localStorage.getItem('currentUser'));
  };  

  constructor(private eventDetailService:EventDetailService, private activatedRoute:ActivatedRoute) {
    this.currentUser = this.getAuth();
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
      });
    }
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
}
