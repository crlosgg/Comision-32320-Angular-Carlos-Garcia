import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'students', loadChildren: () => import('./components/platform/students/students-routing.module').then(m => m.StudentsRoutingModule), canActivate: [AdminGuard] },
  { path: 'courses', loadChildren: () => import('./components/platform/courses/courses-routing.module').then(m => m.CoursesRoutingModule), canActivate: [AuthGuard] },
  { path: 'classes', loadChildren: () => import('./components/platform/classes/classes-routing.module').then(m => m.ClassesRoutingModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
