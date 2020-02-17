import { TestBed } from '@angular/core/testing';

import { PresentationDataService } from './presentation-data.service';

describe('PresentationDataService', () => {
  let service: PresentationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresentationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
