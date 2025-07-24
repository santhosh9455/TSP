import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  fb = inject(FormBuilder);
  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    age: ['', [Validators.required, Validators.min(1)]],
    gender: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    departmentId: ['', Validators.required],
    profileImage: [null, Validators.required],
    marksheetImage: [null, Validators.required]
  });

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Register form submitted:', this.registerForm.value);
    }
  }
}
