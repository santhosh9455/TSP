import { Routes } from '@angular/router';
import { Dashboard } from './Components/dashboard/dashboard';
import { Users } from './Components/users/users';
import { Faculties } from './Components/faculties/faculties';
import { Courses } from './Components/courses/courses';
import { Login } from './Components/login/login';
import { Home } from './Components/home/home';
import { Register } from './Components/register/register';
import { authGuard } from './Services/auth-gurd';
import { Students } from './Components/students/students';
import { ViewStudent } from './Components/view-student/view-student';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home },
  { path: 'contact', component: Home },

  // Admin module routes
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'users', component: Users },
      { path: 'faculties', component: Faculties },
      { path: 'courses', component: Courses },
      { path: 'students', component: Students },
      { path: 'view-student', component: ViewStudent }


    ]
  },

  // Wildcard (not found) route
  { path: '**', redirectTo: 'login' }
];

