import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService,UsersResDto } from '../../Services/Admin/users-service';

@Component({
  selector: 'app-users',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {


  users: UsersResDto[] = [];
  search: string = '';
  roleId?: number;
  page = 0;
  size = 10;
  totalPages = 0;
  
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers(this.page, this.size , this.search, this.roleId, ).subscribe(response => {
      this.users = response.content;
      this.totalPages = response.totalPages;
    });
  }
 

  onSearch(): void {
    this.page = 0;
    this.fetchUsers();
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.fetchUsers();
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.fetchUsers();
    }
  }

}
