import { TestBed, inject } from '@angular/core/testing';

import { CalendarListService } from './calendar-list.service';

describe('CalendarListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarListService]
    });
  });

  it('should be created', inject([CalendarListService], (service: CalendarListService) => {
    expect(service).toBeTruthy();
  }));
});
