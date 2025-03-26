import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetizationRequestsComponent } from './monetization-requests.component';

describe('MonetizationRequestsComponent', () => {
  let component: MonetizationRequestsComponent;
  let fixture: ComponentFixture<MonetizationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonetizationRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonetizationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
