import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateSubject, Subject, UpdateSubject } from '../models/subejct.model';
import { HttpErrorResponse } from '@angular/common/http';

export const MateriasActions = createActionGroup({
  source: 'Materias',
  events: {
    'Load Materias': emptyProps(),
    'Load Materias Success': props<{ data: Subject[] }>(),
    'Load Materias Failure': props<{ error: HttpErrorResponse }>(),

    'Create Materias': props<{ payload: CreateSubject }>(),
    'Create Materias Success': props<{ data: Subject }>(),
    'Create Materias Failure': props<{ error: HttpErrorResponse }>(),

    'Update Materias': props<{ id: number, payload: UpdateSubject }>(),
    'Update Materias Success': props<{ id: number, data: Subject }>(),
    'Update Materias Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Materias': props<{ id: number }>(),
    'Delete Materias Success': emptyProps(),
    'Delete Materias Failure': props<{ error: HttpErrorResponse }>(),
  }
});
