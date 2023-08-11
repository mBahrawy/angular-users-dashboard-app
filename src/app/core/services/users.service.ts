import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Response } from '../interfaces/response';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpService) {}

  index(page: number, per_page: number) {
    return this.http.getRequest<Response<User>>(`users?page=${page}&per_page=${per_page}`);
  }
}
