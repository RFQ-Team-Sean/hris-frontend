import { TestBed } from '@angular/core/testing';

import { PersonnelManagementService } from './personnel-management.service';

describe('PersonnelManagementService', () => {
  let service: PersonnelManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonnelManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
