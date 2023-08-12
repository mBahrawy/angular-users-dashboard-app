import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  isAuth$!: BehaviorSubject<boolean>;

  constructor(private http: HttpService, private router: Router) {
    this.isAuth$ = new BehaviorSubject<boolean>(!!this.getToken());
  }

  login(email: string, password: string) {
    return this.http
      .postRequest<{ token: string }>('login', { email, password })
      .pipe(
        tap((res) => {
          if (!res?.token) return;
          this.isAuth$.next(true);
          localStorage.setItem('token', res.token);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token') || null;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuth$.next(false);
    this.router.navigate(['/login']);
  }
}
