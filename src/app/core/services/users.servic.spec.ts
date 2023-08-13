import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { HttpService } from './http.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { User } from '../interfaces/user';
import { PaginatedResponse, Response } from '../interfaces/response';

describe('UsersService', () => {
  let usersService: UsersService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpService', [
      'getRequest',
      'postRequest',
      'putRequest',
      'deleteRequest',
    ]);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success']);

    TestBed.configureTestingModule({
      providers: [
        UsersService,
        { provide: HttpService, useValue: httpSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ],
    });

    usersService = TestBed.inject(UsersService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should be created', () => {
    expect(usersService).toBeTruthy();
  });

  it('should fetch users with correct page and per_page parameters', () => {
    const mockResponse : PaginatedResponse<User[]> = {
      "page": 2,
      "per_page": 6,
      "total": 12,
      "total_pages": 2,
      "data": [
          {
              "id": 7,
              "email": "michael.lawson@reqres.in",
              "first_name": "Michael",
              "last_name": "Lawson",
              "avatar": "https://reqres.in/img/faces/7-image.jpg"
          },
          {
              "id": 8,
              "email": "lindsay.ferguson@reqres.in",
              "first_name": "Lindsay",
              "last_name": "Ferguson",
              "avatar": "https://reqres.in/img/faces/8-image.jpg"
          },
      ],
      "support": {
          "url": "https://reqres.in/#support-heading",
          "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
      }
  }
    httpServiceSpy.getRequest.and.returnValue(of(mockResponse));

    usersService.index(1, 5).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpServiceSpy.getRequest).toHaveBeenCalledWith('users?page=1&per_page=5');
  });

  it('should fetch a single user by ID', () => {
    const userId = 1;
    const mockResponse: Response<User> = {
      data: {
        "id": 1,
        "email": "george.bluth@reqres.in",
        "first_name": "George",
        "last_name": "Bluth",
        "avatar": "https://reqres.in/img/faces/1-image.jpg"
    },
    };
    httpServiceSpy.getRequest.and.returnValue(of(mockResponse));

    usersService.single(userId).subscribe(user => {
      expect(user).toEqual(mockResponse.data);
    });

    expect(httpServiceSpy.getRequest).toHaveBeenCalledWith(`users/${userId}`);
  });

});
