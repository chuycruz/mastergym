import { TestBed } from '@angular/core/testing';

import { MensajesAlertService } from './mensajes-alert.service';

describe('MensajesAlertService', () => {
  let service: MensajesAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajesAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
