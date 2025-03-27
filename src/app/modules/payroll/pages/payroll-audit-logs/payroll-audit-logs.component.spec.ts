import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollAuditLogsComponent } from './payroll-audit-logs.component';

describe('PayrollAuditLogsComponent', () => {
  let component: PayrollAuditLogsComponent;
  let fixture: ComponentFixture<PayrollAuditLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayrollAuditLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollAuditLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
