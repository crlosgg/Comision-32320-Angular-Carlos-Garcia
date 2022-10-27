import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { ListComponent } from './list/list.component';
import { ModalComponent } from './modal/modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    ModalComponent,
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
