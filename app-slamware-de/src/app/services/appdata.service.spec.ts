import { TestBed } from '@angular/core/testing';

import { AppdataService } from './appdata.service';

describe('AppdataService', () => {
  let service: AppdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
