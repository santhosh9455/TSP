import { inject, Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service';


export interface UsersResDto {
  id: number;
  username: string;
  roleId: number;
  role: string;
  password:string;
}

export interface CustomPageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private apiUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) {}

  authService = inject(AuthService);

   

   tokenHeader = this.authService.getAuthHeaders();

  getUsers(page: number, size: number, search?: string, roleId?: number): Observable<CustomPageResponse<UsersResDto>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

      if (search) {
        params = params.set('search', search); 
      }

      if (roleId) {
        params = params.set('roleId', roleId.toString()); 
      }

      return this.http.get<CustomPageResponse<UsersResDto>>(this.apiUrl + '/users', {
        params,
        headers: this.authService.getAuthHeaders()
      });
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/getRoles', {
      headers: this.authService.getAuthHeaders()
    });
  }

  createNewUser(newUser: any) {
  const body = {
    username: newUser.username,
    password: newUser.password,
    roleId: newUser.roleId
  };

  return this.http.post<any>(
    this.apiUrl + '/createUsers',
    body,
    { headers: this.authService.getAuthHeaders() }
  );
}


}
