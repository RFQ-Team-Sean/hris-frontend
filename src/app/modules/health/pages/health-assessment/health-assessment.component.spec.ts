import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthAssessmentComponent } from './health-assessment.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HealthAssessmentComponent', () => {
  let component: HealthAssessmentComponent;
  let fixture: ComponentFixture<HealthAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HealthAssessmentComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(HealthAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 