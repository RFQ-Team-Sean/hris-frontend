import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipDataComponent } from './membership-data.component';

describe('MembershipDataComponent', () => {
  let component: MembershipDataComponent;
  let fixture: ComponentFixture<MembershipDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
