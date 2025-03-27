import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveDashboardComponent } from './employee-leave-dashboard.component';

describe('EmployeeLeaveDashboardComponent', () => {
  let component: EmployeeLeaveDashboardComponent;
  let fixture: ComponentFixture<EmployeeLeaveDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeLeaveDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeLeaveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
