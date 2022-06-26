import { TestBed } from '@angular/core/testing';

import { RoundService } from './round.service';

describe('RoundService', () => {
  let service: RoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
