import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { UserActions } from './user.actions';
import { UsersService } from '../users.service';
import { User } from '../models/user.model';


@Injectable()
export class UserEffects {
  public users$: Observable<User[]>;

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UserActions.loadUsers),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.users$.pipe(
          map(data => UserActions.loadUsersSuccess({ data })),
          catchError(error => of(UserActions.loadUsersFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private usersService: UsersService) {
    this.usersService.loadUsers();
    this.users$ = this.usersService.getUsers();
  }
}
