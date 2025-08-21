import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private baseUrl = "http://localhost:8080/";

  authService = inject(AuthService);

  constructor(private http: HttpClient) {

  }

  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(this.baseUrl + url, {
      headers: this.authService.getAuthHeaders(),
      params: params
    });
  }

  post(url: string, data: any): Observable < any > {
    return this.http.post(this.baseUrl + url, data,
      {
        headers: this.authService.getAuthHeaders()
      }
    );
  }
  
  patch(url: string, data: any): Observable < any > {
    return this.http.patch(this.baseUrl + url, data,
      {
        headers: this.authService.getAuthHeaders()
      }
    );
  }
  
  put(url: string, data: any): Observable < any > {
    return this.http.put(this.baseUrl + url, data,
      {
        headers: this.authService.getAuthHeaders()
      }
    );
  }
  
  delete (url:string): Observable < any > {
    return this.http.delete(this.baseUrl + url,
      {
        headers: this.authService.getAuthHeaders()
      }
    );
  }
}

