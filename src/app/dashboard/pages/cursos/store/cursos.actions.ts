import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course, CreateCourse, UpdateCourse, expandedCourse } from '../models/course.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from '../../materias/models/subejct.model';

export const CursosActions = createActionGroup({
  source: 'Cursos',
  events: {
    'Load Cursos': emptyProps(),
    'Load Cursos Success': props<{ data: expandedCourse[] }>(),
    'Load Cursos Failure': props<{ error: unknown }>(),

    'Load Cursos Detail': props<{ id: number }>(),
    'Load Cursos Detail Success': props<{ data: expandedCourse }>(),
    'Load Cursos Detail Failure': props<{ error: unknown }>(),

    'Load Subject': emptyProps(),
    'Load Subject Success': props<{ data: Subject[] }>(),
    'Load Subject Failure': props<{ error: unknown }>(),

    'Create Courses': props<{ payload: CreateCourse }>(),
    'Create Courses Success': props<{ data: Course }>(),
    'Create Courses Failure': props<{ error: HttpErrorResponse }>(),

    'Update Courses': props<{ id: number, payload: UpdateCourse }>(),
    'Update Courses Success': props<{ id: number, data: Course }>(),
    'Update Courses Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Courses': props<{ id: number }>(),
    'Delete Courses Success': emptyProps(),
    'Delete Courses Failure': props<{ error: HttpErrorResponse }>(),
  }
});
