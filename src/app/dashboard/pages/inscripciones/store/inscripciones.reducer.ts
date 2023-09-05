import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { Inscription } from '../models/inscripciones.model';
import { Student } from '../../estudiantes/models/student.model';
import { Course } from '../../cursos/models/course.model';
import { Subject } from '../../materias/models/subejct.model';

export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  data: Inscription[],
  studentOptions: Student[],
  coursesOptions: Course[],
  subjectOptions: Subject[],
  loading: boolean,
  error: unknown
}

export const initialState: State = {
  data: [],
  studentOptions: [],
  coursesOptions: [],
  subjectOptions: [],
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
  }),
  on(InscripcionesActions.loadStudents, state => {
    return {
      ...state,
      loading: true
    }
  }),
  on(InscripcionesActions.loadStudentsSuccess, (state, action) => {
    return {
      ...state,
      studentOptions: action.data,
      loading: false
    }
  }),
  on(InscripcionesActions.loadStudentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),
  on(InscripcionesActions.loadCourses, state => {
    return {
      ...state,
      loading: true
    }
  }),
  on(InscripcionesActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      coursesOptions: action.data,
      loading: false
    }
  }),
  on(InscripcionesActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),
  on(InscripcionesActions.loadSubjects, state => {
    return {
      ...state,
      loading: true
    }
  }),
  on(InscripcionesActions.loadSubjectsSuccess, (state, action) => {
    return {
      ...state,
      subjectOptions: action.data,
      loading: false
    }
  }),
  on(InscripcionesActions.loadSubjectsFailure, (state, action) => {
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

