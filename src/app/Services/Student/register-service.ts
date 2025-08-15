import { Injectable, OnInit } from '@angular/core';
import { MainService } from '../Main/main-service';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService implements OnInit{

  constructor(private mainService: MainService,private http:HttpClient) {
    // Constructor implementation
  }
  ngOnInit(): void {

  }


  getDepartments():Observable<CustomPageResponse<departments>>{
    return this.http.get<CustomPageResponse<departments>>('http://localhost:8080/dept/AllFilterDept').pipe(
      catchError(this.handleError)
    );
  }


  registerStudent(formData: any): Observable<any> {
    
    

    console.log("data", formData);
    
    return this.http.post('http://localhost:8080/api/students/registerRequest', formData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something Wrong...........';
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
}



//--------------------------------------------InterFaces--------------------------------------------------//


export interface departments{

  id:number,
  departmentName:string
}

export interface CustomPageResponse<T> {
  departments: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}