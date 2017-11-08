import { TestBed, inject } from '@angular/core/testing';

import { EventDetailService } from './event-detail.service';

describe('EventDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventDetailService]
    });
  });

  it('should ...', inject([EventDetailService], (service: EventDetailService) => {
    expect(service).toBeTruthy();
  }));
});
