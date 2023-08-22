import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Role } from '../models/roles.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: User[] }>(),
    'Load Users Failure': props<{ error: HttpErrorResponse }>(),
    'Load Roles': emptyProps(),
    'Load Roles Success': props<{ data: Role[] }>(),
    'Load Roles Failure': props<{ error: HttpErrorResponse }>(),
  }
});
