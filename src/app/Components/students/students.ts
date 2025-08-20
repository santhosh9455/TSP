import { Component, OnInit } from '@angular/core';
import { StudentResDto } from '../../Interface/studentResDto';
import { StudentService } from '../../Services/Admin/student-service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-students',
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './students.html',
  styleUrls: ['./students.css'],
})
export class Students implements OnInit {
  studentsList: StudentResDto[] = [];
  selectedStudents: StudentResDto[] = [];

  search?: string = '';
  departmentId?: number;
  status?: string;
  page = 0;
  size = 5;
  totalPages = 0;
  totalElements = 0;

  // sorting state
  sortField: keyof StudentResDto | null = 'firstName';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    this.studentService
      .getStudents(this.page, this.size, this.search, this.departmentId, this.status)
      .subscribe({
        next: (res) => {
          this.studentsList = res.content.flat();
          this.totalElements = res.totalElements;
          this.totalPages = res.totalPages;

          // apply default sort
          if (this.sortField) {
            this.applySort(this.sortField);
          }
        },
        error: (err) => console.error('fetchStudents error', err.message),
      });
  }

  // apply client-side sort
  applySort(field: keyof StudentResDto) {
    this.sortField = field;
    this.studentsList = [...this.studentsList].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      if (aVal == null || bVal == null) return 0;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return this.sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return this.sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }

      if (aVal instanceof Date && bVal instanceof Date) {
        return this.sortOrder === 'asc'
          ? aVal.getTime() - bVal.getTime()
          : bVal.getTime() - aVal.getTime();
      }

      return 0;
    });
  }

  // toggle sort when header clicked
  toggleSort(field: keyof StudentResDto) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.applySort(field);
  }

  // pagination
  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.fetchStudents();
    }
  }

  // inside Students class
  sizes: number[] = [5, 10, 20, 50]; // available page sizes

  changePageSize(newSize: string | number) {
  this.size = Number(newSize);
  this.page = 0; // reset to first page
  this.fetchStudents();
}


}
