import { createFeature, createReducer, on } from '@ngrx/store';
import { CursosActions } from './cursos.actions';
import { Course, expandedCourse } from '../models/course.model';
import { Subject } from '../../materias/models/subejct.model';

export const cursosFeatureKey = 'cursos';

export interface State {
  data: expandedCourse[],
  subjectOptions: Subject[],
  loading: boolean,
  error: unknown
}

export const initialState: State = {
  data: [],
  subjectOptions: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(CursosActions.loadCursos, state => {
    return {
      ...state,
      loading: true
    }
  }),
  on(CursosActions.loadCursosSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false

    }
  }),
  on(CursosActions.loadCursosFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(CursosActions.loadSubject, state => {
    return {
      ...state,
      loading: true
    }
  }),
  on(CursosActions.loadSubjectSuccess, (state, action) => {
    return {
      ...state,
      subjectOptions: action.data,
      loading: false
    }
  }),
  on(CursosActions.loadSubjectFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  })
);


export const cursosFeature = createFeature({
  name: cursosFeatureKey,
  reducer,
});

