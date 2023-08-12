import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Response } from '../interfaces/response';
import { User, UserFormData } from '../interfaces/user';
import { map, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpService, private toaster: ToastrService) {}

  index(page: number, per_page: number) {
    return this.http.getRequest<Response<User[]>>(
      `users?page=${page}&per_page=${per_page}`
    );
  }

  single(userId: number | string) {
    return this.http
      .getRequest<Response<User>>(`users/${userId}`)
      .pipe(map((res) => res.data));
  }

  edit(user: UserFormData, userId: number) {
    return this.http
      .putRequest(`users/${userId}`, user)
      .pipe(tap(() => this.toaster.success('User data was updated.')));
  }

  new(user: UserFormData) {
    return this.http
      .postRequest(`users`, user)
      .pipe(tap(() => this.toaster.success('User was created.')));
  }
}
