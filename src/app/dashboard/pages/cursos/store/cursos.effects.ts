import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { CursosActions } from './cursos.actions';
import { Subject } from '../../materias/models/subejct.model';
import { CursosService } from '../cursos.service';
import { CreateCourse, UpdateCourse, expandedCourse } from '../models/course.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';


@Injectable()
export class CursosEffects {
  public subjectsOpts$: Observable<Subject[]>;

  loadCursoss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CursosActions.loadCursos),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => CursosActions.loadCursosSuccess({ data })),
          catchError(error => of(CursosActions.loadCursosFailure({ error }))))
      )
    );
  });

  loadSubjects$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CursosActions.loadSubject),
      concatMap(() =>
        this.subjectsOpts$.pipe(
          map(data => CursosActions.loadSubjectSuccess({ data })),
          catchError(error => of(CursosActions.loadSubjectFailure({ error }))))
      )
    );
  });

  createSubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.createCourses),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.createCourse(action.payload).pipe(
          map(data => CursosActions.createCoursesSuccess({ data })),
          catchError(error => of(CursosActions.createCoursesFailure({ error }))))
      )
    );
  });

  createSubjectSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.createCoursesSuccess),
      map(() => this.store.dispatch(CursosActions.loadCursos()))
    )
  }, { dispatch: false })

  updateSubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.updateCourses),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.updateCourse(action.id, action.payload).pipe(
          map(data => CursosActions.updateCoursesSuccess({
            id: data.id,
            data: data
          })),
          catchError(error => of(CursosActions.updateCoursesFailure({ error }))))
      )
    );
  });

  updateSubjectSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.updateCoursesSuccess),
      map(() => this.store.dispatch(CursosActions.loadCursos()))
    )
  }, { dispatch: false })

  deleteSubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.deleteCourses),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.deleteCourse(action.id).pipe(
          map(() => CursosActions.deleteCoursesSuccess()),
          catchError(error => of(CursosActions.deleteCoursesFailure({ error }))))
      )
    )
  })

  deleteSubjectSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.deleteCoursesSuccess),
      map(() => this.store.dispatch(CursosActions.loadCursos()))
    )
  }, { dispatch: false })


  constructor(private actions$: Actions, private store: Store, private cursosService: CursosService, private httpClient: HttpClient) {
    this.subjectsOpts$ = this.cursosService.getSubjects();
  }

  private getCoursesFromDB(): Observable<expandedCourse[]> {
    return this.httpClient.get<expandedCourse[]>(environment.baseApiUrl + '/courses?_expand=subject')
  }

  createCourse(payload: CreateCourse) {
    return this.cursosService.createCourse(payload);

  }
  updateCourse(id: number, payload: UpdateCourse): Observable<expandedCourse> {
    return this.cursosService.updateCourseById(id, payload);
  }

  deleteCourse(id: number) {
    return this.cursosService.deleteCourseById(id);
  }
}
