import { Component, OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#920a3f',
    secondary: '#FAE3E3'
  },
  pink: {
    primary: '#ff004a',
    secondary: '#FAE3E3'
  },
  yellow: {
    primary: '#ffbe39',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#0093ff',
    secondary: '#FAE3E3'
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

  getAuth() {
    return JSON.parse(localStorage.getItem('currentUser'));
  };

  constructor() {
    this.currentUser = this.getAuth();
  }

  ngOnInit() {
  }

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  
    view: string = 'month';
  
    viewDate: Date = new Date();
  
    modalData: {
      action: string;
      event: CalendarEvent;
    };
  
    actions: CalendarEventAction[] = [
      {
        label: '<i class="fa fa-fw fa-pencil"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('Edited', event);
        }
      },
      {
        label: '<i class="fa fa-fw fa-times"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.events = this.events.filter(iEvent => iEvent !== event);
          this.handleEvent('Deleted', event);
        }
      }
    ];
  
    locale: string = 'pl';
  
    events: CalendarEvent[] = [
      {
        start: new Date(),
        end: new Date(),
        title: 'Ćwiczenia platformy technologiczne',
        color: colors.yellow
      },
      {
        start: addDays(startOfDay(new Date()), 2),
        end: addDays(startOfDay(new Date()), 2),
        title: 'Ćwiczenia GIS',
        color: colors.yellow
      },
      {
        start: subDays(startOfDay(new Date()), 5),
        end: subDays(startOfDay(new Date()), 5),
        title: 'Ćwiczenia platformy technologiczne',
        color: colors.yellow
      },
      {
        start: addDays(startOfDay(new Date()), 10),
        end: addDays(startOfDay(new Date()), 10),
        title: 'Ćwiczenia GIS',
        color: colors.yellow
      },
      {
        start: new Date(),
        end: new Date(),
        title: 'Egzamin AKO',
        color: colors.red
      },
      {
        start: addDays(startOfDay(new Date()), 6),
        end: addDays(startOfDay(new Date()), 6),
        title: 'Kolokwium grafy',
        color: colors.red
      },
      {
        start: subDays(startOfDay(new Date()), 10),
        end: subDays(startOfDay(new Date()), 10),
        title: 'Oddanie projektu, platformy technologiczne',
        color: colors.red
      },
      {
        start: addDays(startOfDay(new Date()), 10),
        end: addDays(startOfDay(new Date()), 10),
        title: 'Koło AKO',
        color: colors.red
      },
      {
        start: new Date(),
        end: new Date(),
        title: 'Wykład analiza mat',
        color: colors.pink
      },
      {
        start: addDays(startOfDay(new Date()), 4),
        end: addDays(startOfDay(new Date()), 4),
        title: 'Wykład analiza mat',
        color: colors.pink
      },
      {
        start: subDays(startOfDay(new Date()), 5),
        end: subDays(startOfDay(new Date()), 5),
        title: 'Wykład GMS',
        color: colors.pink
      },
      {
        start: addDays(startOfDay(new Date()), 12),
        end: addDays(startOfDay(new Date()), 12),
        title: 'Wykład GMS',
        color: colors.pink
      },
      {
        start: addDays(startOfDay(new Date()), 2),
        end: addDays(startOfDay(new Date()), 2),
        title: 'Wykład AKO',
        color: colors.blue
      },
      {
        start: addDays(startOfDay(new Date()), 4),
        end: addDays(startOfDay(new Date()), 4),
        title: 'Wykład AKO',
        color: colors.blue
      },
      {
        start: addDays(startOfDay(new Date()), 4),
        end: addDays(startOfDay(new Date()), 4),
        title: 'Laborki grafy',
        color: colors.yellow
      },
      {
        start: addDays(startOfDay(new Date()), 12),
        end: addDays(startOfDay(new Date()), 12),
        title: 'Laborki grafy',
        color: colors.blue
      },
    ];
  
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
      this.handleEvent('Dropped or resized', event);
      this.refresh.next();
    }
  
    handleEvent(action: string, event: CalendarEvent): void {
     
    }
  
    addEvent(): void {
    }

}
