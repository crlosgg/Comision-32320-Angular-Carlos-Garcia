import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import * as CoursesActions from './courses.actions';
import { CoursesService } from '../services/courses.service';
import { Course } from 'src/app/models/course';

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(CoursesActions.loadCourses),
      concatMap(() => this.courses.getCourses().pipe(
        map((i: Course[]) => CoursesActions.coursesLoaded({courses: i}))
      ))
    );
  });

  addCourses$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(CoursesActions.addCourse),
      concatMap(({ course }) => this.courses.addCourse(course).pipe(
        map((i: Course) => CoursesActions.loadCourses())
      ))
    );
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      concatMap(({ id }) => this.courses.deleteCourse(id).pipe(
        map((i: Course) => CoursesActions.loadCourses())
      ))
    );
  });

  editarCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.editCourse),
      concatMap(({ course }) => this.courses.updateCourse(course).pipe(
        map((i: Course) => CoursesActions.loadCourses())
      ))
    );
  });

  constructor(
    private actions$: Actions,
    private courses: CoursesService
  ) {}
}