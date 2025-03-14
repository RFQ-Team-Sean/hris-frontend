import { TestBed } from '@angular/core/testing';

import { JobportalService } from './jobportal.service';

describe('JobportalService', () => {
  let service: JobportalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobportalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
