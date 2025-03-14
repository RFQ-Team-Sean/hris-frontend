import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSelfAssessmentComponent } from './employee-self-assessment.component';

describe('EmployeeSelfAssessmentComponent', () => {
  let component: EmployeeSelfAssessmentComponent;
  let fixture: ComponentFixture<EmployeeSelfAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSelfAssessmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSelfAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
