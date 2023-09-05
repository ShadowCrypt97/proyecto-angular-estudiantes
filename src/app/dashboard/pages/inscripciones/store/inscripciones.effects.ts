import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscripcionesActions } from './inscripciones.actions';
import { HttpClient } from '@angular/common/http';
import { InscriptionExpanded } from '../models/inscripciones.model';
import { environment } from 'src/environments/environment';
import { Student } from '../../estudiantes/models/student.model';
import { InscripcionesService } from '../inscripciones.service';
import { Course } from '../../cursos/models/course.model';
import { Subject } from '../../materias/models/subejct.model';


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


  constructor(private actions$: Actions, private httpClient: HttpClient, private inscriptionsService: InscripcionesService) {
    this.studentOpts$ = this.inscriptionsService.getStudents();
    this.coursesOpts$ = this.inscriptionsService.getCourses();
    this.subjectsOpts$ = this.inscriptionsService.getSubjects();
  }

  private getInscriptionsFromDB(): Observable<InscriptionExpanded[]> {
    return this.httpClient.get<InscriptionExpanded[]>(environment.baseApiUrl + '/inscripciones?_expand=student&_expand=course&_expand=subject')
  }
}
