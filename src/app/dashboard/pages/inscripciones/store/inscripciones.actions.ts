import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { InscriptionExpanded } from '../models/inscripciones.model';
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
  }
});
