import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private tokenSubject: BehaviorSubject<string | null>;
  public token: Observable<string | null>;


  constructor(private http: HttpService, private router: Router) {
    this.tokenSubject = new BehaviorSubject<string | null>(this.getToken());
    this.token = this.tokenSubject.asObservable();  }
    isLoggedIn () {
      return !!this.tokenSubject.value
    }

  login(email: string, password: string) {



    return this.http
    .postRequest<{ token: string }>('login', { email, password })
    .pipe(
      tap((res) => {
        // res?.token && this.token.next(res?.token);
        this.tokenSubject.next(res.token);
          res?.token && localStorage.setItem('token', res.token);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token') || null;
  }

  logout(): void {

    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login'])


  }
}
