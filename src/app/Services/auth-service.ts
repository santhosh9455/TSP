import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';



interface LoginResponse {
  token?: string;
  message?: string;
  user?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/auth';
  router = inject(Router);

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials, {
      headers,
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Login failed. Please try again.';

    // Try to get server error message if available
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client error:', error.error.message);
    } else {
      // Server-side error
      console.error(`Server error: ${error.status} - ${error.error?.message || error.message}`);
      if (error.error?.message) {
        errorMessage = error.error.message;
      }
    }

    return throwError(() => new Error(errorMessage));
  }

  getUserRole(): string[] {
    const token = this.getToken();
    if (!token) return [];

    try {
      const decoded: any = jwtDecode(token);
      // console.log('Decoded JWT:', decoded);
      return decoded.authorities || []; // Your token has authorities field
    } catch (error) {
      console.error('JWT decode failed', error);
      return [];
    }
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.sub || null;  // 'sub' usually holds the username
    } catch (error) {
      console.error('JWT decode failed', error);
      return null;
    }
  }

  getAuthHeaders() {
    const token = this.getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
  storeToken(token: string): void {
    sessionStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']); // navigate to login
  }

  isLoggedIn(): boolean {
    return !!this.getToken();

  }

}


