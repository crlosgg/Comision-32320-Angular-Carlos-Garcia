import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { ListComponent } from './list/list.component';
import { ModalComponent } from './modal/modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesService } from './services/courses.service';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './state/courses.effects';
import { StoreModule } from '@ngrx/store';
import { coursesFeatureKey, reducer } from './state/courses.reducers';


@NgModule({
  declarations: [
    ListComponent,
    ModalComponent,
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    StoreModule.forFeature(coursesFeatureKey, reducer),
    EffectsModule.forFeature([CoursesEffects])
  ],
  providers: [
    CoursesService
  ]
})
export class CoursesModule { }
