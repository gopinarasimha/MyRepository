import { TestBed, inject } from '@angular/core/testing';
import { DealPageService } from './deal-page.service';

describe('DealPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealPageService]
    });
  });

  it('should ...', inject([DealPageService], (service: DealPageService) => {
    expect(service).toBeTruthy();
  }));
});
