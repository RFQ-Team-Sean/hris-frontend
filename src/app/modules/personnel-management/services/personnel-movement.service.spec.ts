import { TestBed } from '@angular/core/testing';

import { PersonnelMovementService } from './personnel-movement.service';

describe('PersonnelMovementService', () => {
  let service: PersonnelMovementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonnelMovementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
