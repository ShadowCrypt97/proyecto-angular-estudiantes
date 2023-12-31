import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateUser, UpdateUser, User, UserWithRole } from '../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Role } from '../models/roles.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: UserWithRole[] }>(),
    'Load Users Failure': props<{ error: HttpErrorResponse }>(),

    'Load Roles': emptyProps(),
    'Load Roles Success': props<{ data: Role[] }>(),
    'Load Roles Failure': props<{ error: HttpErrorResponse }>(),

    'Create User': props<{ payload: CreateUser }>(),
    'Create User Success': props<{ data: User }>(),
    'Create User Failure': props<{ error: HttpErrorResponse }>(),

    'Update User': props<{ id: number, payload: UpdateUser }>(),
    'Update User Success': props<{ id: number, data: User }>(),
    'Update User Failure': props<{ error: HttpErrorResponse }>(),

    'Delete User': props<{ id: number }>(),
    'Delete User Success': emptyProps(),
    'Delete User Failure': props<{ error: HttpErrorResponse }>(),
  }
});
