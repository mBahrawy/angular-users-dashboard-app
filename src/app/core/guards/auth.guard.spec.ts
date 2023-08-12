import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { AuthServiceMock } from '../tests/auth.service.mock';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useValue: {} },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
