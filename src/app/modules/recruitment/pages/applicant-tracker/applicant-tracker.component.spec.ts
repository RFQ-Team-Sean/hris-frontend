import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantTrackerComponent } from './applicant-tracker.component';

describe('ApplicantTrackerComponent', () => {
  let component: ApplicantTrackerComponent;
  let fixture: ComponentFixture<ApplicantTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
