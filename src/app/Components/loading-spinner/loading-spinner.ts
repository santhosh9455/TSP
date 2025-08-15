import { Component } from '@angular/core';
import { LoadingService } from '../../Services/loading-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-loading-spinner',
  imports: [CommonModule],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.css'
})
export class LoadingSpinner {

  loading$: any;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }
}
