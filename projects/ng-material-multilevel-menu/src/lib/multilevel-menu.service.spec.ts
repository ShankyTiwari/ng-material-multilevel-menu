import { TestBed, inject } from '@angular/core/testing';

import { MultilevelMenuService } from './multilevel-menu.service';

describe('MultilevelMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultilevelMenuService]
    });
  });

  it('should be created', inject([MultilevelMenuService], (service: MultilevelMenuService) => {
    expect(service).toBeTruthy();
  }));
});
