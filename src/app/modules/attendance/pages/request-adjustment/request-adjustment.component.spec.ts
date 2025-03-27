import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAdjustmentComponent } from './request-adjustment.component';

describe('RequestAdjustmentComponent', () => {
  let component: RequestAdjustmentComponent;
  let fixture: ComponentFixture<RequestAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestAdjustmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
