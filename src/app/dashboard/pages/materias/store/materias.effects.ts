import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MateriasActions } from './materias.actions';
import { HttpClient } from '@angular/common/http';
import { MateriasService } from '../materias.service';
import { Store } from '@ngrx/store';
import { CreateSubject, Subject, UpdateSubject } from '../models/subejct.model';
import { environment } from 'src/environments/environment';


@Injectable()
export class MateriasEffects {

  loadMaterias$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(MateriasActions.loadMaterias),
      concatMap(() =>
        this.getSubjectsFromDB().pipe(
          map(data => MateriasActions.loadMateriasSuccess({ data })),
          catchError(error => of(MateriasActions.loadMateriasFailure({ error }))))
      )
    );
  });

  createMaterias$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MateriasActions.createMaterias),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.createSubject(action.payload).pipe(
          map(data => MateriasActions.createMateriasSuccess({ data })),
          catchError(error => of(MateriasActions.createMateriasFailure({ error }))))
      )
    );
  });

  createMateriasSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MateriasActions.createMateriasSuccess),
      map(() => this.store.dispatch(MateriasActions.loadMaterias()))
    )
  }, { dispatch: false });

  deleteMateria$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MateriasActions.deleteMaterias),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.deleteSubject(action.id).pipe(
          map(() => MateriasActions.deleteMateriasSuccess()),
          catchError(error => of(MateriasActions.deleteMateriasFailure({ error }))))
      )
    )
  });

  deleteMateriaSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MateriasActions.deleteMateriasSuccess),
      map(() => this.store.dispatch(MateriasActions.loadMaterias()))
    )
  }, { dispatch: false });

  updateMaterias$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MateriasActions.updateMaterias),
      concatMap((action) =>
        this.updateSubject(action.id, action.payload).pipe(
          map(data => MateriasActions.updateMateriasSuccess({
            id: data.id,
            data: data
          })),
          catchError(error => of(MateriasActions.createMateriasFailure({ error }))))
      )
    );
  });

  updateMateriasSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MateriasActions.createMateriasSuccess),
      map(() => this.store.dispatch(MateriasActions.loadMaterias()))
    )
  }, { dispatch: false });

  constructor(private actions$: Actions, private httpClient: HttpClient, private materiasService: MateriasService, private store: Store) { }
  private getSubjectsFromDB(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(environment.baseApiUrl + '/subjects')
  }

  private createSubject(payload: CreateSubject): Observable<Subject> {
    return this.materiasService.createSubject(payload);
  }

  private updateSubject(id: number, payload: UpdateSubject): Observable<Subject> {
    return this.materiasService.updateSubjectById(id, payload);
  }

  private deleteSubject(id: number): Observable<Subject> {
    return this.materiasService.deleteSubjectById(id);
  }
}
