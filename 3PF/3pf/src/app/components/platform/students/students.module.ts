import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { ListComponent } from './list/list.component';
import { ModalComponent } from './modal/modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';


@NgModule({
  declarations: [
    ListComponent,
    ModalComponent,
    ConfirmationModalComponent
  ],
  imports: [
    StudentsRoutingModule,
    SharedModule,
    CommonModule
  ],
  exports:[ ]
})
export class StudentsModule { }
