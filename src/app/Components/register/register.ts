import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService, departments } from '../../Services/Student/register-service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { tamilNaduDistricts } from '../../Interface/districs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectComponent],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  Districts: string[] = tamilNaduDistricts;

  fb = inject(FormBuilder);
  registerForm: FormGroup = this.fb.group({
    // Basic Details
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    departmentId: [null, Validators.required],
    programmeLevel: [null, Validators.required],
    dateOfBirth: ['', Validators.required],
    age: [''],
    gender: ['', Validators.required],
    profileImage: [null, Validators.required],

    // Personal Details
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+(com|in|edu)$/i)]],
    aadharNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]],

    // Family Details
    fatherName: [''],
    fatherMobile: [''],
    fatherOccupation: [''],
    motherName: [''],
    motherMobile: [''],
    motherOccupation: [''],
    guardianName: [''],
    guardianPhone:[''],
    // Address Details
    street: ['', Validators.required],
    city: ['', Validators.required],
    taluk: ['', Validators.required],
    district: [null, Validators.required],
    pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],

    // Academic Details
    schoolName: ['', Validators.required],
    hostelBusService: [''],
    boardingPoint: [''],

    // Certificates
    marksheetImage10th: [null, Validators.required],
    marksheetImage12th: [null, Validators.required],
    ugCertificate: [null]
  });

  programmeLevels = [
    { label: 'Undergraduate', value: 'undergraduate' },
    { label: 'Postgraduate', value: 'postgraduate' },
  ];

  departments: departments[] = [];
  filterDept: departments[] = [];

  constructor(private registerService: RegisterService) {
    this.getDepartments();
  }

  ngOnInit() {
    this.registerForm.get('dateOfBirth')?.valueChanges.subscribe(date => {
      if (date) {
        const age = this.calculateAge(date);
        this.registerForm.patchValue({ age: age }, { emitEvent: false });
      } else {
        this.registerForm.patchValue({ age: '' }, { emitEvent: false });
      }
    });

    this.registerForm.get('programmeLevel')?.valueChanges.subscribe(level => {
      this.filterdept(level);
      if (level) {
        this.registerForm.patchValue({ departmentId: '' });
      }
    });
  }

  calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control?.touched && control?.invalid);
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  onFileSelected(event: Event, controlName: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.registerForm.get(controlName)?.setValue(file);
    }
  }

  clearFile(controlName: string, fileInput: HTMLInputElement) {
    this.registerForm.get(controlName)?.setValue(null);
    fileInput.value = ''; // Safe clear
  }

  filterdept(programmeLevel: string) {
    if (!programmeLevel) {
      this.filterDept = [...this.departments];
      return;
    }
    if (programmeLevel === 'undergraduate') {
      this.filterDept = this.departments.filter(dept => /^B/i.test(dept.departmentName));
    } else if (programmeLevel === 'postgraduate') {
      this.filterDept = this.departments.filter(dept => /^M/i.test(dept.departmentName));
    } else {
      this.filterDept = [...this.departments];
    }
  }

  getDepartments() {
    this.registerService.getDepartments().subscribe((response) => {
      this.departments = response.departments;
      this.filterDept = [...this.departments];
    });
  }

  profilePreview: string | ArrayBuffer | null = null;

onProfileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];

    // Store in form
    this.registerForm.patchValue({ profileImagePath: file });
    this.registerForm.get('profileImagePath')?.updateValueAndValidity();

    // Show preview
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}


  onSubmit() {

    console.log("Form Submitted");
    
    if (this.registerForm.valid) {
      const formData = new FormData();
      Object.keys(this.registerForm.value).forEach(key => {
        const value = this.registerForm.value[key];
        if (key === 'age') return;
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && value !== undefined && value !== '') {
          formData.append(key, value);
        }
      });
      console.log('Form Submitted:', this.registerForm.value);

      this.registerService.registerStudent(formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      });
    }
  }
}
