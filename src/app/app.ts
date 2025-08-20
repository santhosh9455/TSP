import { Component, isStandalone, NgModule, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './Components/sidebar/sidebar';
import { Navbar } from './Components/navbar/navbar';
import { NgApexchartsModule } from "ng-apexcharts";
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoadingSpinner } from "./Components/loading-spinner/loading-spinner";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-root',
  imports: [NgApexchartsModule, SweetAlert2Module,
    Navbar,
    Sidebar, ToastModule,
    RouterOutlet,
    CommonModule,
    HttpClientModule, LoadingSpinner,
    TableModule,
    InputTextModule,
    ButtonModule,
    PaginatorModule,
    TooltipModule],
  providers: [MessageService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  ngOnInit(): void {
    initFlowbite();
  }

  isLogin = true;

  protected readonly title = signal('TSP');
  sidebarOpen = signal(false);

  toggleSidebar() {
    this.sidebarOpen.update(open => !open);
  }

}
