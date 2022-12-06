import { Action, createReducer, on } from '@ngrx/store';
import { CourseState } from 'src/app/models/course.state';
import * as CoursesActions from './courses.actions';

export const coursesFeatureKey = 'courses';

export const initialState: CourseState = {
  loading: false,
  courses: []
};


export const reducer = createReducer(
  initialState,
  on(CoursesActions.loadCourses, (state) => {
    return {...state, loading: true }
  }),
  on(CoursesActions.coursesLoaded, (state, {courses}) => {
    return {...state, loading: false, courses: courses}
  }),
  // on(InscripcionesActions.agregarInscripcion, (state, {inscripcion}) => {
  //   return state
  // }),
  // on(InscripcionesActions.editarInscripcion, (state, {inscripcion}) => {
  //   return state
  // }),
  // on(InscripcionesActions.eliminarInscripcion, (state, {inscripcion}) => {
  //   return state
  // })
);