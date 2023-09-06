import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCursos from './cursos.reducer';

export const selectCursosState = createFeatureSelector<fromCursos.State>(
  fromCursos.cursosFeatureKey
);

export const selectCourse = createSelector(selectCursosState, (state) => state.data)

export const selectSubject = createSelector(selectCursosState, (state) => state.subjectOptions)

export const selectCourseName = createSelector(selectCursosState, (state) => state.detailData?.subject.subject_name)

export const selectCourseDescription = createSelector(selectCursosState, (state) => state.detailData?.subject.description)

export const selectCourseId = createSelector(selectCursosState, (state) => state.detailData?.id)

export const selectIniDate = createSelector(selectCursosState, (state) => state.detailData?.initialDate)

export const selectEndDate = createSelector(selectCursosState, (state) => state.detailData?.endDate)
