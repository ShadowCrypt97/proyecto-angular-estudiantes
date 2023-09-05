import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateInscription, Inscription, InscriptionExpanded, UpdateInscription } from '../models/inscripciones.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from '../../estudiantes/models/student.model';
import { Course } from '../../cursos/models/course.model';
import { Subject } from '../../materias/models/subejct.model';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    'Load Inscripciones': emptyProps(),
    'Load Inscripciones Success': props<{ data: InscriptionExpanded[] }>(),
    'Load Inscripciones Failure': props<{ error: HttpErrorResponse }>(),

    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: Student[] }>(),
    'Load Students Failure': props<{ error: HttpErrorResponse }>(),

    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: Course[] }>(),
    'Load Courses Failure': props<{ error: HttpErrorResponse }>(),

    'Load Subjects': emptyProps(),
    'Load Subjects Success': props<{ data: Subject[] }>(),
    'Load Subjects Failure': props<{ error: HttpErrorResponse }>(),

    'Create Inscriptions': props<{ payload: CreateInscription }>(),
    'Create Inscriptions Success': props<{ data: Inscription }>(),
    'Create Inscriptions Failure': props<{ error: HttpErrorResponse }>(),

    'Update Inscriptions': props<{ id: number, payload: UpdateInscription }>(),
    'Update Inscriptions Success': props<{ id: number, data: Inscription }>(),
    'Update Inscriptions Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Inscriptions': props<{ id: number }>(),
    'Delete Inscriptions Success': emptyProps(),
    'Delete Inscriptions Failure': props<{ error: HttpErrorResponse }>(),
  }
});
