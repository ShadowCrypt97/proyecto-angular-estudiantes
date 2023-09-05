import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscripcionesActions } from './inscripciones.actions';
import { HttpClient } from '@angular/common/http';
import { CreateInscription, InscriptionExpanded, UpdateInscription } from '../models/inscripciones.model';
import { environment } from 'src/environments/environment';
import { Student } from '../../estudiantes/models/student.model';
import { InscripcionesService } from '../inscripciones.service';
import { Course } from '../../cursos/models/course.model';
import { Subject } from '../../materias/models/subejct.model';
import { Store } from '@ngrx/store';


@Injectable()
export class InscripcionesEffects {

  public studentOpts$: Observable<Student[]>;
  public coursesOpts$: Observable<Course[]>;
  public subjectsOpts$: Observable<Subject[]>;


  loadInscripciones$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionesActions.loadInscripciones),
      concatMap(() =>
        this.getInscriptionsFromDB().pipe(
          map(data => InscripcionesActions.loadInscripcionesSuccess({ data })),
          catchError(error => of(InscripcionesActions.loadInscripcionesFailure({ error }))))
      )
    );
  });

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionesActions.loadStudents),
      concatMap(() =>
        this.studentOpts$.pipe(
          map(data => InscripcionesActions.loadStudentsSuccess({ data })),
          catchError(error => of(InscripcionesActions.loadStudentsFailure({ error }))))
      )
    );
  });

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionesActions.loadCourses),
      concatMap(() =>
        this.coursesOpts$.pipe(
          map(data => InscripcionesActions.loadCoursesSuccess({ data })),
          catchError(error => of(InscripcionesActions.loadCoursesFailure({ error }))))
      )
    );
  });

  loadSubjects$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionesActions.loadSubjects),
      concatMap(() =>
        this.subjectsOpts$.pipe(
          map(data => InscripcionesActions.loadSubjectsSuccess({ data })),
          catchError(error => of(InscripcionesActions.loadSubjectsFailure({ error }))))
      )
    );
  });

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.createInscriptions),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.createInscription(action.payload).pipe(
          map(data => InscripcionesActions.createInscriptionsSuccess({ data })),
          catchError(error => of(InscripcionesActions.createInscriptionsFailure({ error }))))
      )
    );
  });

  createInscriptionSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.createInscriptionsSuccess),
      map(() => this.store.dispatch(InscripcionesActions.loadInscripciones()))
    )
  }, { dispatch: false })

  deleteInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.deleteInscriptions),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.deleteInscription(action.id).pipe(
          map(() => InscripcionesActions.deleteInscriptionsSuccess()),
          catchError(error => of(InscripcionesActions.deleteInscriptionsFailure({ error }))))
      )
    )
  })

  deleteInscriptionSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.deleteInscriptionsSuccess),
      map(() => this.store.dispatch(InscripcionesActions.loadInscripciones()))
    )
  }, { dispatch: false })


  constructor(private actions$: Actions, private httpClient: HttpClient, private inscriptionsService: InscripcionesService, private store: Store) {
    this.studentOpts$ = this.inscriptionsService.getStudents();
    this.coursesOpts$ = this.inscriptionsService.getCourses();
    this.subjectsOpts$ = this.inscriptionsService.getSubjects();
  }

  private getInscriptionsFromDB(): Observable<InscriptionExpanded[]> {
    return this.httpClient.get<InscriptionExpanded[]>(environment.baseApiUrl + '/inscripciones?_expand=student&_expand=course&_expand=subject')
  }

  createInscription(payload: CreateInscription) {
    return this.inscriptionsService.createInscription(payload);

  }

  deleteInscription(id: number) {
    return this.inscriptionsService.deleteInscriptionById(id);
  }

}
