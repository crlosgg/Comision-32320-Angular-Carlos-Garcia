import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'students', loadChildren: () => import('./components/platform/students/students-routing.module').then(m => m.StudentsRoutingModule) },
  { path: 'courses', loadChildren: () => import('./components/platform/courses/courses-routing.module').then(m => m.CoursesRoutingModule) },
  { path: 'classes', loadChildren: () => import('./components/platform/classes/classes-routing.module').then(m => m.ClassesRoutingModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
