import { Component, Output, EventEmitter, input, inject, NgModule, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  constructor(private router: Router) {

  }
  ngOnInit(): void {
    this.userRoles = this.authService.getUserRole();
    this.isLoggedIn();
  }

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() closeSidebar = new EventEmitter<void>();


  authService = inject(AuthService)

  isMenuOpen: boolean = false;
  userRoles: string[] = [];

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  isLoggedIn(): boolean {
    const Admin = this.authService.getUserRole();
    return !!this.authService.getToken();

  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  onClick() {
    if (this.isLoggedIn()) {
      sessionStorage.removeItem('authToken');
    }
    this.closeSidebar.emit(); // ✅ close sidebar
  }



}