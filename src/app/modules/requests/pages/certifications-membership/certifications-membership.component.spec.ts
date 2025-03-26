import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationsMembershipComponent } from './certifications-membership.component';

describe('CertificationsMembershipComponent', () => {
  let component: CertificationsMembershipComponent;
  let fixture: ComponentFixture<CertificationsMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationsMembershipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationsMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
