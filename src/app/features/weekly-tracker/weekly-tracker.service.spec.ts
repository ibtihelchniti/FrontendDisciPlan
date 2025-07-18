import { TestBed } from '@angular/core/testing';

import { WeeklyTrackerService } from './weekly-tracker.service';

describe('WeeklyTrackerService', () => {
  let service: WeeklyTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
