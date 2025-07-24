import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface UsersResDto {
  id: number;
  username: string;
  roleId: number;
  roleName: number;
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
  
  private apiUrl = 'http://localhost:8080/admin/students';

  constructor(private http: HttpClient) {}

  getUsers(page: number, size: number, search?: string, roleId?: number): Observable<CustomPageResponse<UsersResDto>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (search) {
      params.set('search', search);
    }

    if(roleId){
      params.set('roleId', roleId.toString());
    }

    return this.http.get<CustomPageResponse<UsersResDto>>(this.apiUrl, { params });
  }
}
