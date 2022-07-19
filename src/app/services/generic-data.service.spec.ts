import { TestBed } from '@angular/core/testing';

import { GenericDataService } from './generic-data.service';

describe('GenericDataService', () => {
  let service: GenericDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
