import { TestBed } from '@angular/core/testing';
import { DeAuthGuard } from './de-auth.guard';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthServiceMock } from '../tests/auth.service.mock';

describe('DeAuthGuard', () => {
  let guard: DeAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useValue: {} },
      ],
    });
    guard = TestBed.inject(DeAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
