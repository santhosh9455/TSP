import { Observable } from 'rxjs';
import { StudentResDto } from '../../Interface/studentResDto';
import { MainService } from '../Main/main-service';
import { CustomPageResponse } from '../../Interface/CustomPageResponse';
import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  mainService = inject(MainService);


  getStudents(page: number, size: number, search?: string, departmentId?: number,status?:string): Observable<CustomPageResponse<StudentResDto[]>> {
    
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

    return this.mainService.get(`admin/api/students`,  params );

  }
}
