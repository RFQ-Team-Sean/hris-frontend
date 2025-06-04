import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDocumentRequestsComponent } from './employee-document-requests.component';

describe('EmployeeDocumentRequestsComponent', () => {
  let component: EmployeeDocumentRequestsComponent;
  let fixture: ComponentFixture<EmployeeDocumentRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDocumentRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDocumentRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
