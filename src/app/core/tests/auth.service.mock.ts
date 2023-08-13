import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class AuthServiceMock {
  isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  login(email: string, password: string): Observable<{token : string}> {
    // Simulate a successful login
    this.isAuth$.next(true);
    return of({ token: 'mocked-token' });
  }

  getToken(): string | null {
    return 'mocked-token';
  }

  logout(): void {
    this.isAuth$.next(false);
    this.router.navigate(['/login']);
  }
}
