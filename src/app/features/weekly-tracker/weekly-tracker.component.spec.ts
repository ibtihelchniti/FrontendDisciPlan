import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTrackerComponent } from './weekly-tracker.component';

describe('WeeklyTrackerComponent', () => {
  let component: WeeklyTrackerComponent;
  let fixture: ComponentFixture<WeeklyTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyTrackerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeeklyTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
