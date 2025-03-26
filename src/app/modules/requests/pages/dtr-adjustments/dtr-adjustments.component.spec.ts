import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtrAdjustmentsComponent } from './dtr-adjustments.component';

describe('DtrAdjustmentsComponent', () => {
  let component: DtrAdjustmentsComponent;
  let fixture: ComponentFixture<DtrAdjustmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtrAdjustmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DtrAdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
