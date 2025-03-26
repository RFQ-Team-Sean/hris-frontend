import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDeductionsComponent } from './loan-deductions.component';

describe('LoanDeductionsComponent', () => {
  let component: LoanDeductionsComponent;
  let fixture: ComponentFixture<LoanDeductionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanDeductionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanDeductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
