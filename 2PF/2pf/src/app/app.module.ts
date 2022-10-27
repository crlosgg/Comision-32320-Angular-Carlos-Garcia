import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { StudentsModule } from './components/platform/students/students.module';
import { CoreModule } from './core.module';
import { SharedModule } from './shared.module';
import { CoursesModule } from './components/platform/courses/courses.module';
import { ClassesModule } from './components/platform/classes/classes.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    CommonModule,
    StudentsModule,
    CoursesModule,
    ClassesModule,
    SharedModule
  ],
  exports:[
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
