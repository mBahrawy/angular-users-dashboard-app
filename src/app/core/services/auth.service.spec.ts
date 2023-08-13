import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpService', ['postRequest']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpService, useValue: httpSpy },
        { provide: Router, useValue: routerSpyObj }
      ]
    });

    authService = TestBed.inject(AuthService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should set isAuth$ to true and save token on successful login', (done) => {
    const dummyToken = 'dummy-token';
    httpServiceSpy.postRequest.and.returnValue(
      new BehaviorSubject<{ token: string }>({ token: dummyToken })
    );

    authService.login('test@example.com', 'password').pipe(
      tap(() => {
        expect(authService.isAuth$.value).toBe(true);
        expect(localStorage.getItem('token')).toBe(dummyToken);
        done();
      })
    ).subscribe();

    expect(httpServiceSpy.postRequest).toHaveBeenCalledWith('login', {
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should navigate to "/login" and clear token on logout', () => {
    authService.logout();

    expect(authService.isAuth$.value).toBe(false);
    expect(localStorage.getItem('token')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
