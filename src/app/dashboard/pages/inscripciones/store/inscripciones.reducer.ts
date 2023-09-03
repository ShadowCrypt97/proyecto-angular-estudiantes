import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { Inscription } from '../models/inscripciones.model';

export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  data: Inscription[],
  loading: boolean,
  error: unknown
}

export const initialState: State = {
  data: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(InscripcionesActions.loadInscripciones, state => {
    return {
      ...state,
      loading: true
    }
  }),
  on(InscripcionesActions.loadInscripcionesSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false
    }
  }),
  on(InscripcionesActions.loadInscripcionesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  })
);

export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer,
});

