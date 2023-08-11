import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  postRequest(path: string, data?: unknown): Observable<unknown> {
    return this.http.post(path, data);
  }

  getRequest(path: string): Observable<unknown> {
    return this.http.get(path);
  }

  putRequest(path: string, data?: unknown): Observable<unknown> {
    return this.http.put(path, data);
  }
  deleteRequest(path: string, data?: unknown): Observable<unknown> {
    return this.http.put(path, data);
  }
}
