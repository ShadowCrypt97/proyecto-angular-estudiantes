import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscripciones from './inscripciones.reducer';

export const selectInscripcionesState = createFeatureSelector<fromInscripciones.State>(
  fromInscripciones.inscripcionesFeatureKey
);

export const selectInscription = createSelector(selectInscripcionesState, (state) => state.data)

export const selectStudent = createSelector(selectInscripcionesState, (state) => state.studentOptions)

export const selectCourse = createSelector(selectInscripcionesState, (state) => state.coursesOptions)

export const selectSubject = createSelector(selectInscripcionesState, (state) => state.subjectOptions)
