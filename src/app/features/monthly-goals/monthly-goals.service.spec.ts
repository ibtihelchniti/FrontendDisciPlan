import { TestBed } from '@angular/core/testing';

import { MonthlyGoalsService } from './monthly-goals.service';

describe('MonthlyGoalsService', () => {
  let service: MonthlyGoalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyGoalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
