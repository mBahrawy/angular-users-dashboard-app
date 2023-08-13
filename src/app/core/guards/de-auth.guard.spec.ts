import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { DeAuthGuard } from './de-auth.guard';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('DeAuthGuard', () => {
  let guard: DeAuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getToken']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        DeAuthGuard,
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpyObj }
      ]
    });

    guard = TestBed.inject(DeAuthGuard);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to "/users" and return false if a token is present', () => {
    authServiceSpy.getToken.and.returnValue('dummy-token');

    const canActivateResult = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(canActivateResult).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should return true if no token is present', () => {
    authServiceSpy.getToken.and.returnValue(null);

    const canActivateResult = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(canActivateResult).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
