import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Response } from '../interfaces/response';
import { User, UserFormData } from '../interfaces/user';

@Injectable()
export class UsersServiceMock {
  constructor() {}

  index(page: number, per_page: number): Observable<Response<User[]>> {
    const mockUsers: User[] = [
      // Create mock user objects as needed
    ];
    const mockResponse: Response<User[]> = {
      data: mockUsers,
      total: mockUsers.length,
      per_page: per_page,
      page: page,
      total_pages: 5,
    };
    return of(mockResponse);
  }

  single(userId: number | string): Observable<User> {
    const mockUser: User = {
      id: 0,
      email: 'test_user@domain.com',
      first_name: 'test',
      last_name: 'user',
      avatar: 'http://localhost:3000/images/avatar.png',
    };
    return of(mockUser);
  }

  edit(user: UserFormData, userId: number): Observable<any> {
    return of({});
  }

  new(user: UserFormData): Observable<any> {
    return of({});
  }

  distroy(userId: number): Observable<any> {
    return of({});
  }
}
