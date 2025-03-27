import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursementBankingDashboardComponent } from './disbursement-banking-dashboard.component';

describe('DisbursementBankingDashboardComponent', () => {
  let component: DisbursementBankingDashboardComponent;
  let fixture: ComponentFixture<DisbursementBankingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisbursementBankingDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisbursementBankingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
