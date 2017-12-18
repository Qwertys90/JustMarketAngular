import { TestBed, inject } from '@angular/core/testing';

import { CarrelloService } from './carrello.service';

describe('CarrelloService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarrelloService]
    });
  });

  it('should be created', inject([CarrelloService], (service: CarrelloService) => {
    expect(service).toBeTruthy();
  }));
});
