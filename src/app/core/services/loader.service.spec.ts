import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService]
    });

    loaderService = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(loaderService).toBeTruthy();
  });

  it('should show loader', () => {
    loaderService.isLoading.subscribe(isLoading => {
      expect(isLoading).toBe(true);
    });

    loaderService.show();
  });

  it('should hide loader', () => {
    loaderService.isLoading.subscribe(isLoading => {
      expect(isLoading).toBe(false);
    });

    loaderService.hide();
  });
});
