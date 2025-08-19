import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth-service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  imports: [FormsModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  authService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService);

  public showPassword = false;
  fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    username: ['',Validators.required],
    password: ['', Validators.required]
  })

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login form submitted:', this.loginForm.value);
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next:(res)=>{
          if(res.token){
            this.authService.storeToken(res.token);
            this.router.navigate(['admin/dashboard']);
          }
        },
        error:(err)=>{
          console.log("Login Error ", err.error.errorMessage);
          this.messageService.add({
          severity: 'warn',
          summary: 'Login Failed',
          detail: 'Invalid username or password. Please try again.'
        });
        }
      })
    }
  }
}
