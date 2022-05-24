/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TranseferenciaService } from './transeferencia.service';

describe('Service: Transeferencia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranseferenciaService]
    });
  });

  it('should ...', inject([TranseferenciaService], (service: TranseferenciaService) => {
    expect(service).toBeTruthy();
  }));
});
