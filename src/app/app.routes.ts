import { Routes } from '@angular/router';
import { Dashboard } from './Components/dashboard/dashboard';
import { Users } from './Components/users/users';
import { Faculties } from './Components/faculties/faculties';
import { Courses } from './Components/courses/courses';
import { Login } from './Components/login/login';
import { Home } from './Components/home/home';
import { Register } from './Components/register/register';
import { authGuard } from './Services/auth-gurd';

export const routes: Routes = [
  {path:'',component:Login},
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'register', component: Register },
  { path: 'contact', component: Home },
  { path: 'admin/dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'admin/users', component: Users, canActivate: [authGuard] },
  { path: 'admin/faculties', component: Faculties, canActivate: [authGuard] },
  { path: 'admin/courses', component: Courses, canActivate: [authGuard] },

];
