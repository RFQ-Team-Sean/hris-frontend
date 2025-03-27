import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceHistoryComponent } from './leave-balance-history.component';

describe('LeaveBalanceHistoryComponent', () => {
  let component: LeaveBalanceHistoryComponent;
  let fixture: ComponentFixture<LeaveBalanceHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveBalanceHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveBalanceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
