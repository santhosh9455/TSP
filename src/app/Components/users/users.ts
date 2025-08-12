import { Component , ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService,UsersResDto } from '../../Services/Admin/users-service';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { NewUser } from '../../Models/UserModel/new-user/new-user';

@Component({
  selector: 'app-users',
  standalone:true,
  imports: [CommonModule, FormsModule, NewUser],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  
  

  searchChanged: Subject<string> = new Subject();

  users: UsersResDto[] = [];
  search: string = '';
  roleId?: number;
  page = 0;
  size = 5;
  totalPages = 0;
  
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    console.log("User Component called");
    
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers(this.page, this.size , this.search, this.roleId, ).subscribe(response => {
      this.users = response.content;
      this.totalPages = response.totalPages;
    });
  }
 

  onSearch($event:any): void {
    this.page = 0;
    this.searchChanged.next($event)
    this.searchChanged.pipe(debounceTime(200)).subscribe(value => {
      this.fetchUsers();
    });
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


  newUserModel(){
    console.log("New User model method called from user component");
    
    this.modal.open();
  }
}
