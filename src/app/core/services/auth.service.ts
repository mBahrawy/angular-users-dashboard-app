import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable()
export class AuthService {
  token!: string | null;

  constructor(private http: HttpService) {}

  login(email: string, password: string) {
    return this.http.postRequest('login', { email, password });
  }

  isAuthenticated() {
    return !!this.token;
  }

  logout() {
    this.token = null;
  }
}
