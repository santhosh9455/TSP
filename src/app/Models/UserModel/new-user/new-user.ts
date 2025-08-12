import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../Services/Admin/users-service';


@Component({
  standalone: true,
  selector: 'app-new-user',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-user.html',
  styleUrl: './new-user.css'
})


export class NewUser {

  constructor(private UserService: UsersService) { }
  fb = inject(FormBuilder);

  showModal: boolean = false;


  open(): void {
    console.log("new User model open method called via user");
    this.showModal = true;
    this.getRoles();
    console.log(this.showModal);

  }

  close(): void {
    this.NewUserDto.reset();
    this.showModal = false;
  }

  roles: any[] = [];

  getRoles() {
    this.UserService.getRoles().subscribe((response: any[]) => {
      this.roles = response;
    },
      (error) => {
        console.error('Error fetching roles:', error);
      });
  }

  NewUserDto: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    roleId: [null, Validators.required]
  })

  showPassword: boolean = false;
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  createUser() {
  if (this.NewUserDto.invalid) {
    this.NewUserDto.markAllAsTouched();
    return;
  }

  const newUser = this.NewUserDto.value;
  console.log("Creating user:", newUser);

  // Call service
  this.UserService.createNewUser(newUser).subscribe({
    next: (res) => {
      console.log("User created:", res);
      this.close();
    },
    error: (err) => {
      console.error("Failed to create user:", err.errorMessage);
    }
  });
}

}
