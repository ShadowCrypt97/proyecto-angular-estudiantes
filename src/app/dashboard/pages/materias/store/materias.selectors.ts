import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterias from './materias.reducer';

export const selectMateriasState = createFeatureSelector<fromMaterias.State>(
  fromMaterias.materiasFeatureKey
);

export const selectMateria = createSelector(selectMateriasState, (state) => state.data)
