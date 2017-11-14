import { Component, OnInit } from '@angular/core';
import { CalendarListService } from './calendar-list.service';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  addDays,
  subDays,
  format
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

const colors: any = {
  laboratorium: {
    primary: '#00c2f1'
  },
  cwiczenia: {
    primary: '#000b9c'
  },
  projekt: {
    primary: '#ffcc0c'
  },
  zaliczenie: {
    primary: '#f10062'
  },
  wyklady: {
    primary: '#00eacc'
  },
  inne: {
    primary: 'c5ea00'
  }
};


@Component({
  selector: 'calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})
export class CalendarListComponent implements OnInit {

  currentUser = "";
  authToken = localStorage.getItem('currentUser');
  myevents = [];
  events: CalendarEvent[] = [];

  getAuth() {
    return JSON.parse(localStorage.getItem('currentUser'));
  };
  

  constructor(private calendarlistService:CalendarListService) {
    this.currentUser = this.getAuth();
  }

  ngOnInit() {
    if(this.getAuth()) {
      this.fetchEvents(); 
    }
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

    this.calendarlistService.getEvents((myevents)=>{
      this.myevents = myevents;
      console.log(this.myevents);
      this.events = [];    

      for (let i = 0; i < this.myevents.length; i++) {
        var stringDateToObj = this.myevents[i].START_DATE.split("/");
        var dateObj = new Date(stringDateToObj[2], stringDateToObj[1] - 1, stringDateToObj[0]);
        var typeColor = this.myevents[i].TYPE;
        var typeColorVal = colors.laboratorium;

        switch(typeColor) {
          case 'Ćwiczenia': {
            typeColorVal = colors.cwiczenia;
            break;
          }
          case 'Projekt': {
            typeColorVal = colors.projekt;
            break;
          }
          case 'Zaliczenie': {
            typeColorVal = colors.zaliczenie;
            break;
          }
          case 'Wykłady': {
            typeColorVal = colors.wyklady;
            break;
          }
          case 'Inne': {
            typeColorVal = colors.inne;
            break;
          }
          default: {
            break;
          }
        }
        this.events.push({
            start: dateObj,
            end: dateObj,
            title: this.myevents[i].NAME+ " " + this.myevents[i].START_HOUR + "-" + this.myevents[i].END_HOUR,
            color: typeColorVal
        })
      }
    }, format(getStart(this.viewDate), 'DD/MM/YYYY'), format(getEnd(this.viewDate), 'DD/MM/YYYY'));    
  }

  setPrevStartEndDates() {
    console.log('yyy');
  }

  @ViewChild('modalContent') modalContent: TemplateRef<any>;  
  view: string = 'month';  
  viewDate: Date = new Date(); 
  locale: string = 'pl';  
  activeDayIsOpen: boolean = false;
    
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
  
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
  }
}
