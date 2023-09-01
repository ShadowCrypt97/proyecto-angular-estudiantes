import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, take, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { UserActions } from './user.actions';
import { UsersService } from '../users.service';
import { CreateUser, UpdateUser, User, UserWithRole } from '../models/user.model';
import { Role } from '../models/roles.model';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable()
export class UserEffects {

  public usersRoles$: Observable<Role[]>;

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UserActions.loadUsers),
      switchMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getUsersFromDB().pipe(
          map(data => UserActions.loadUsersSuccess({ data })),
          catchError(error => of(UserActions.loadUsersFailure({ error }))))
      )
    );
  });

  loadUserRoles$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UserActions.loadRoles),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.usersRoles$.pipe(
          map(data => UserActions.loadRolesSuccess({ data })),
          catchError(error => of(UserActions.loadRolesFailure({ error }))))
      )
    );
  });
  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.createUser),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.createUser(action.payload).pipe(
          map(data => UserActions.createUserSuccess({ data })),
          catchError(error => of(UserActions.createUserFailure({ error }))))
      )
    );
  });

  createUserSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.createUserSuccess),
      map(() => this.store.dispatch(UserActions.loadUsers()))
    )
  }, { dispatch: false })

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.updateUser(action.id, action.payload).pipe(
          map(data => UserActions.updateUserSuccess({
            id: data.id,
            data: data
          })),
          catchError(error => of(UserActions.createUserFailure({ error }))))
      )
    );
  });

  updateUserSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUserSuccess),
      map(() => this.store.dispatch(UserActions.loadUsers()))
    )
  }, { dispatch: false })

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.deleteUser(action.id).pipe(
          map(() => UserActions.deleteUserSuccess()),
          catchError(error => of(UserActions.createUserFailure({ error }))))
      )
    )
  })

  deleteUserSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUserSuccess),
      map(() => this.store.dispatch(UserActions.loadUsers()))
    )
  }, { dispatch: false })

  constructor(private actions$: Actions, private httpClient: HttpClient, private usersService: UsersService, private store: Store) {
    this.usersRoles$ = this.usersService.getRoles();
  }
  private getUsersFromDB(): Observable<UserWithRole[]> {
    return this.httpClient.get<UserWithRole[]>(environment.baseApiUrl + '/users?_expand=role')
  }

  createUser(payload: CreateUser): Observable<UserWithRole> {
    return this.usersService.createUser(payload);
  }

  updateUser(id: number, payload: UpdateUser): Observable<UserWithRole> {
    return this.usersService.updateUserById(id, payload);
  }

  deleteUser(id: number): Observable<User> {
    return this.usersService.deleteUserById(id);
  }
}
