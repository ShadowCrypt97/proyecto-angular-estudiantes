import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCursos from './cursos.reducer';

export const selectCursosState = createFeatureSelector<fromCursos.State>(
  fromCursos.cursosFeatureKey
);

export const selectCourse = createSelector(selectCursosState, (state) => state.data)

export const selectSubject = createSelector(selectCursosState, (state) => state.subjectOptions)
