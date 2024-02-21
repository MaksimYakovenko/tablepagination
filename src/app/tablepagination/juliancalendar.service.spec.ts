import { TestBed } from '@angular/core/testing';

import { JuliancalendarService } from './juliancalendar.service';

describe('JuliancalendarService', () => {
  let service: JuliancalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuliancalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
