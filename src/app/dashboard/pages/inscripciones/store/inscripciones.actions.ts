import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { InscriptionExpanded } from '../models/inscripciones.model';
import { HttpErrorResponse } from '@angular/common/http';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    'Load Inscripciones': emptyProps(),
    'Load Inscripciones Success': props<{ data: InscriptionExpanded[] }>(),
    'Load Inscripciones Failure': props<{ error: HttpErrorResponse }>(),
  }
});
