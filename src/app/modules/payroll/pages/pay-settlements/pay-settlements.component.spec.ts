import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaySettlementsComponent } from './pay-settlements.component';

describe('PaySettlementsComponent', () => {
  let component: PaySettlementsComponent;
  let fixture: ComponentFixture<PaySettlementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaySettlementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaySettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
