import { createFeature, createReducer, on } from '@ngrx/store';
import { MateriasActions } from './materias.actions';
import { Subject } from '../models/subejct.model';

export const materiasFeatureKey = 'materias';

export interface State {
  data: Subject[],
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
  on(MateriasActions.loadMaterias, state => {
    return {
      ...state,
      loading: true
    }
  }),
  on(MateriasActions.loadMateriasSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false
    }
  }),
  on(MateriasActions.loadMateriasFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  })
);

export const materiasFeature = createFeature({
  name: materiasFeatureKey,
  reducer,
});

