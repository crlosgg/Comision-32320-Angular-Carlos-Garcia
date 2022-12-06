import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from 'src/app/models/course.state';
import * as fromCourses from './courses.reducers';

export const selectCoursesState = createFeatureSelector<CourseState>(
  fromCourses.coursesFeatureKey
);

export const selectStateCourses = createSelector(
  selectCoursesState,
  (state) => state.courses
)

export const selectStateLoading = createSelector(
  selectCoursesState,
  (state) => state.loading
)