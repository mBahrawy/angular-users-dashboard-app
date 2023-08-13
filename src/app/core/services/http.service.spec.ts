import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { of } from 'rxjs';

describe('HttpService', () => {
  let httpService: HttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        HttpService,
        { provide: HttpClient, useValue: httpSpy }
      ]
    });

    httpService = TestBed.inject(HttpService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(httpService).toBeTruthy();
  });

  it('should send POST request with data', () => {
    const postData = { key: 'value' };
    httpClientSpy.post.and.returnValue(of(postData));

    httpService.postRequest('dummy-path', postData).subscribe(data => {
      expect(data).toEqual(postData);
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith('dummy-path', postData);
  });

  it('should send GET request', () => {
    const responseData = { key: 'value' };
    httpClientSpy.get.and.returnValue(of(responseData));

    httpService.getRequest('dummy-path').subscribe(data => {
      expect(data).toEqual(responseData);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith('dummy-path');
  });

  it('should send PUT request with data', () => {
    const putData = { key: 'new-value' };
    httpClientSpy.put.and.returnValue(of(putData));

    httpService.putRequest('dummy-path', putData).subscribe(data => {
      expect(data).toEqual(putData);
    });

    expect(httpClientSpy.put).toHaveBeenCalledWith('dummy-path', putData);
  });

  it('should send DELETE request', () => {
    const deleteResponse = { message: 'Deleted' };
    httpClientSpy.delete.and.returnValue(of(deleteResponse));

    httpService.deleteRequest('dummy-path').subscribe(data => {
      expect(data).toEqual(deleteResponse);
    });

    expect(httpClientSpy.delete).toHaveBeenCalledWith('dummy-path');
  });
});
