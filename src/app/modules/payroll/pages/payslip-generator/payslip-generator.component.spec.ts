import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipGeneratorComponent } from './payslip-generator.component';

describe('PayslipGeneratorComponent', () => {
  let component: PayslipGeneratorComponent;
  let fixture: ComponentFixture<PayslipGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayslipGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayslipGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
