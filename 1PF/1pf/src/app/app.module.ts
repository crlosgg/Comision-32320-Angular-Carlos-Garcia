import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StudentsComponent } from './components/students/students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material/material.module';
import { StudentModalComponent } from './components/modals/student-modal/student-modal.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { UserFullnamePipe } from './pipes/user-fullname.pipe';
import { CustomerHeaderDirective } from './directives/customer-header.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ToolbarComponent,
    StudentsComponent,
    StudentModalComponent,
    ConfirmationModalComponent,
    UserFullnamePipe,
    CustomerHeaderDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  exports: [
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
