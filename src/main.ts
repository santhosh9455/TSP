import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// ✅ PrimeNG config + Theme
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { loadingInterceptor } from './app/Interceptors/loading-interceptor';
import { MessageService } from 'primeng/api';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideRouter(routes),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities'
          }
        }
      },
      ripple: true
    }),
    MessageService
  ]
});
