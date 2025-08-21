import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StudentResDto } from '../../Interface/studentResDto';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StudentService } from '../../Services/Admin/student-service';



@Component({
  selector: 'app-view-student',
  imports: [],
  templateUrl: './view-student.html',
  styleUrl: './view-student.css'
})
export class ViewStudent implements OnInit {
  student!: StudentResDto; // not an array


  constructor(private route: ActivatedRoute,
    private location: Location,
    private studentService: StudentService
  ) { }

  goBack(): void {
    this.location.back();
  }

  studentId!: number;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.studentId = +params['stud']; // convert to number
      console.log('Student ID:', this.studentId);
      this.fetchStudent(this.studentId)
    });
  }


  fetchStudent(id: number) {
    this.studentService.getFetchStudentById(id).subscribe({
      next: (value) => {
        this.student = value; 
        console.log("student by id",this.student);
      },
      error: (error) => {
        console.error('Error fetching student:', error);
      }
    });
  }

}
