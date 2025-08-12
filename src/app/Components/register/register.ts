import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  fb = inject(FormBuilder);
  registerForm: FormGroup = this.fb.group({
    // Basic Details
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    programmeLevel: ['', Validators.required],
    programmeOfStudy: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    age: [''], // Added back for age calculation display
    gender: ['', Validators.required],
    profileImagePath: [null, Validators.required],
    
    // Personal Details
    phoneNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    aadharNumber: ['', Validators.required],
    
    // Family Details
    fatherName: [''],
    fatherMobile: [''],
    fatherOccupation: [''],
    motherName: [''],
    motherMobile: [''],
    motherOccupation: [''],
    guardianName: [''],
    
    // Address Details
    street: ['', Validators.required],
    city: [''],
    taluk: [''],
    district: ['cuddalore'],
    pincode: ['', Validators.required],
    
    // Academic Details
    schoolName: ['', Validators.required],
    hostelBusService: [''],
    boardingPoint: [''],
    universityName: [''],
    
    // Certificates
    tenthCertificate: [null, Validators.required],
    twelfthCertificate: [null, Validators.required],
    ugCertificate: [null]
  });

  ngOnInit() {
    // Listen for date of birth changes to calculate age
    this.registerForm.get('dateOfBirth')?.valueChanges.subscribe(date => {
      if (date) {
        const age = this.calculateAge(date);
        this.registerForm.patchValue({ age: age }, { emitEvent: false });
      } else {
        this.registerForm.patchValue({ age: '' }, { emitEvent: false });
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

  onSubmit() {
    if (this.registerForm.valid) {
      // Remove age from form data since backend will calculate it
      const formData = { ...this.registerForm.value };
      delete formData.age;
      
      console.log('Admission application submitted:', formData);
    }
  }
}
