import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService, UsersResDto } from '../../Services/Admin/users-service';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { NewUser } from '../../Models/UserModel/new-user/new-user';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, NewUser],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {


  OpenSwal(title: string, text: string, confirmButtonText: string) {
      return Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: 'No, keep it'
      });
  }


  deleteUser(user: UsersResDto) {
    this.OpenSwal(
      'Are you sure?',
      'You won\'t be able to revert this!',
      'Yes, delete it!'
    ).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            Swal.fire(
              'Deleted!',
              `${user.username} has been deleted.`,
              'success'
            );
            this.fetchUsers();
          },
          error: (err: { message: string; }) => {
            Swal.fire(
              'Error!',
              'There was an error deleting the user.' + err.message,
              'error'
            );
          }
        });
      }
    });
  }


  searchChanged: Subject<string> = new Subject();

  users: UsersResDto[] = [];
  search: string = '';
  roleId?: number;
  page = 0;
  size = 5;
  totalPages = 0;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    console.log("User Component called");

    this.fetchUsers();

    // subscribe once
    this.searchChanged.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.search = value;
      this.page = 0;
      this.fetchUsers();
    });
  }

  fetchUsers(): void {
    this.userService.getUsers(this.page, this.size, this.search, this.roleId,).subscribe(response => {
      this.users = response.content;
      this.totalPages = response.totalPages;
    });
  }


  onSearch($event: any): void {
    this.searchChanged.next($event);
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.fetchUsers();
    }
  }

  onPageSizeChange($event: any) {
    this.size = $event;
    this.page = 0;
    this.fetchUsers();
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.fetchUsers();
    }
  }

  @ViewChild(NewUser) modal!: NewUser;


  newUserModel() {
    console.log("New User model method called from user component");

    this.modal.open();
  }

  // roles: any[] = [];

  // getRoles() {
  //   this.userService.getRoles().subscribe((response: any[]) => {
  //     this.roles = response;
  //   },
  //     (error) => {
  //       console.error('Error fetching roles:', error);
  //     });
  // }

  expandedUser: any = {
    id: null,
    username: "",
    role: "",
    password: ""
  };
  

  toggleExpand(user: any) {
    if (this.expandedUser?.id === user.id) {
      this.expandedUser = null; // collapse if same row
    } else {
      this.expandedUser = {
        id: user.id,
        username: user.username,
        role: user.role,
        password: ""
      };
      
    }
  }

  cancelEdit() {
    this.expandedUser = null;
  }

  showPassword: boolean = false;
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  saveUser(user: any) {
    // TODO: call API to update
    console.log('Saving user:', user);
    if (this.expandedUser) {
      if (this.expandedUser.password === user.password) {
        console.log("password is same");
        console.log("New password:", this.expandedUser.password);
        console.log("Old password:", user.password);
      }
    }
    this.expandedUser = null;
  }

}
