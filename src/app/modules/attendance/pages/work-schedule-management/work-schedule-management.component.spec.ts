import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkScheduleManagementComponent } from './work-schedule-management.component';

describe('WorkScheduleManagementComponent', () => {
  let component: WorkScheduleManagementComponent;
  let fixture: ComponentFixture<WorkScheduleManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkScheduleManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkScheduleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
