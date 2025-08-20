import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { finalize, catchError, throwError } from 'rxjs';
import { LoadingService } from '../Services/loading-service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const router = inject(Router);

  loadingService.show();

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // ⚠️ Token expired
        Swal.fire({
          icon: 'warning',
          title: 'Session Expired',
          text: 'Your login session has expired. Please log in again.',
          confirmButtonText: 'Login',
          allowOutsideClick: false
        }).then(() => {
          sessionStorage.removeItem('authToken'); // optional
          router.navigate(['/login']);
        });
      }
      return throwError(() => error);
    }),
    finalize(() => loadingService.hide())
  );
};
