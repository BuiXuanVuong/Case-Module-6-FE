import { TestBed } from '@angular/core/testing';

import { AccountNofiticationService } from './account-nofitication.service';

describe('AccountNofiticationService', () => {
  let service: AccountNofiticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountNofiticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
