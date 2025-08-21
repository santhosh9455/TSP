import { Component, OnInit } from '@angular/core';
import { StudentResDto } from '../../Interface/studentResDto';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { StudentService } from '../../Services/Admin/student-service';
import { FormsModule } from '@angular/forms';

// ✅ Move type here, outside the class
export type StudentField = {
  label: string;
  key: keyof StudentResDto;
  type?: string;
};

@Component({
  standalone: true,
  selector: 'app-view-student',
  templateUrl: './view-student.html',
  styleUrl: './view-student.css',
  imports: [CommonModule, FormsModule],
})
export class ViewStudent implements OnInit {
  student!: StudentResDto; 
  isEditing = false;
  studentId!: number;
  profilePreview: string | ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.studentId = +params['stud']; 
      this.fetchStudent(this.studentId);
    });
  }

  goBack(): void {
    this.location.back();
  }

  fetchStudent(id: number) {
    this.studentService.getFetchStudentById(id).subscribe({
      next: (value) => {
        this.student = value;
      },
      error: (error) => {
        console.error('Error fetching student:', error);
      }
    });
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.profilePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

}
