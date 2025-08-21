import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentResDto } from '../../Interface/studentResDto';
import { StudentService } from '../../Services/Admin/student-service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { departments } from '../../Services/Student/register-service';
import { MessageService } from 'primeng/api';
import { NgSelectComponent } from "@ng-select/ng-select";
import { StudentReportService } from '../../Services/Admin/Student/student-report-service';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-students',
  imports: [CommonModule, DatePipe, FormsModule, NgSelectComponent],
  templateUrl: './students.html',
  styleUrls: ['./students.css'],
})
export class Students implements OnInit {

  constructor(private studentService: StudentService,
    private messageService: MessageService,
    private reportService: StudentReportService,
    private router: Router
  ) { }


  deleteStudent(student: StudentResDto) {
    throw new Error('Method not implemented.');
  }

  viewStudents(student: StudentResDto) {
   this.router.navigate(['/admin/view-student'], { queryParams: { stud: student.id } });// pass ID in URL
}


  // Toggle all rows when header checkbox changes
  toggleSelectAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedStudents = checked ? [...this.studentsList] : [];
    console.log(this.selectedStudents);
  }

  // Check if a student is selected
  isSelected(student: any): boolean {
    return this.selectedStudents.some(s => s.id === student.id);
  }

  // Toggle selection of individual row
  toggleStudentSelection(student: any, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.selectedStudents.push(student);
    } else {
      this.selectedStudents = this.selectedStudents.filter(s => s.id !== student.id);
    }
  }

  // Header checkbox state (all selected)
  isAllSelected(): boolean {
    return this.studentsList.length > 0 && this.selectedStudents.length === this.studentsList.length;
  }

  // Header checkbox state (partially selected)
  isIndeterminate(): boolean {
    return this.selectedStudents.length > 0 && this.selectedStudents.length < this.studentsList.length;
  }



  downloadReport() {
    this.reportService.exportToCSV(this.selectedStudents, 'student-report.csv');
  }

  studentsList: StudentResDto[] = [];
  selectedStudents: StudentResDto[] = [];



  search?: string = '';
  departmentId?: number;
  selectedYear?: string = '';
  status?: string;
  page = 0;
  size = 5;
  totalPages = 0;
  totalElements = 0;

  // sorting state
  sortField: keyof StudentResDto | null = 'firstName';
  sortOrder: 'asc' | 'desc' = 'asc';



  ngOnInit(): void {
    this.fetchStudents();
    this.getDepartments();
  }

  fetchStudents() {
    console.log("size...", this.size);

    this.studentService
      .getStudents(this.page, this.size, this.search, this.departmentId, this.status, this.selectedYear)
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

  yearOfStudy: string[] = ['1st Year', '2nd Year', '3rd Year'];

  selectedDepartment: number | null = null;
  departments: departments[] = [];
  filterDept: departments[] = [];

  getDepartments() {
    this.studentService.getDepartments().subscribe((response) => {

      this.departments = response.departments;
      // this.filterDept = [...this.departments];
      console.log(this.departments);

    }, (error) => {
      console.error('Error fetching departments:', error);
      this.messageService.add({
        severity: 'warn',
        summary: 'Error Fetching Departments',
        detail: 'There was an error fetching the departments.'
      });
    });
  }
}

