import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/models/course';


export const loadCourses = createAction(
  '[Courses] Load Courses'
);

export const coursesLoaded = createAction(
  '[Courses] Courses Loaded',
  props<{ courses: Course[] }>()
)

export const addCourse = createAction(
  '[Courses] Add Course',
  props<{ course: Course }>()
)

export const editCourse = createAction(
  '[Courses] Edit Course',
  props<{ course: Course }>()
)

export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ id: number }>()
)
