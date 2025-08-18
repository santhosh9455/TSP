import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { AuthService } from '../../Services/auth-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgClass,CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {

  router = inject(Router);
  authService = inject(AuthService);

  logout() {
    sessionStorage.removeItem('authToken');
    this.toggleSidebar();
    this.router.navigate(['/login']);
  }
  
  @Input() open: boolean = false;
  @Output() closeSidebar = new EventEmitter<void>();
  islogin: boolean = true; // static for now

  ngOnInit(): void {
    this.authService.getUserRole();
  }

  userRoles: string[] = [];
  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  toggleSidebar() {
    this.closeSidebar.emit();
  }
}
