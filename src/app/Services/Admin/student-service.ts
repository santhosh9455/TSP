import { catchError, Observable, throwError } from 'rxjs';
import { StudentResDto } from '../../Interface/studentResDto';
import { MainService } from '../Main/main-service';
import { CustomPageResponse } from '../../Interface/CustomPageResponse';
import { CustomPageResponses } from '../Student/register-service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { departments } from '../../Interface/departments';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  mainService = inject(MainService);

  http = inject(HttpClient);

  getStudents(page: number, size: number, search?: string, departmentId?: number, status?: string,selectedYear?:string): Observable<CustomPageResponse<StudentResDto[]>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (search) {
      params = params.set('search', search);
    }

    if (departmentId) {
      params = params.set('departmentId', departmentId.toString());
    }

    if (status) {
      params = params.set('status', status);
    }

     if (selectedYear) {
      params = params.set('yearOfStudy', selectedYear);
    }

    return this.mainService.get(`admin/api/students`, params);

  }


  getDepartments(): Observable<CustomPageResponses<departments>> {
    return this.http.get<CustomPageResponses<departments>>('http://localhost:8080/dept/AllFilterDept').pipe(
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

  getFetchStudentById(id: number): Observable<StudentResDto> {
    return this.mainService.get<StudentResDto>(`admin/getStudent/${id}`).pipe(
      catchError(this.handleError)
    );
  }

}
