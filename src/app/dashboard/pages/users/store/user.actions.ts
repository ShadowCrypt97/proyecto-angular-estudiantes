import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: User[] }>(),
    'Load Users Failure': props<{ error: HttpErrorResponse }>(),
  }
});
