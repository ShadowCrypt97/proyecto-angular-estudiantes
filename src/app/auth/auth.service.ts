import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { LoginPayload, RegisterPayload } from './models/authPayload.model';
import { NotificationService } from '../core/services/notification.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth/auth.actions';
import { selectAuthUser } from '../store/auth/auth.selectors';
import { CreateUser, User } from '../dashboard/pages/users/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUser$ = new BehaviorSubject<User | null>(null);
  public authUser$ = this.store.select(selectAuthUser);

  private _registerUser$ = new BehaviorSubject<User[]>([]);
  public registerUser$ = this._registerUser$.asObservable();


  constructor(private notifierService: NotificationService, private router: Router, private httpClient: HttpClient, private store: Store) { }

  isAuthenticated(): Observable<Boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      params: {
        token: token || ''
      }
    }).pipe(
      map((userResult) => {
        return !!userResult.length
      })
    )
  }

  login(payload: LoginPayload): void {
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      params: {
        email: payload.email || '',
        password: payload.password || ''
      }
    }).subscribe({
      next: (response) => {
        if (response.length) {
          const authUser = response[0];
          this.store.dispatch(AuthActions.setAuthUser({ payload: authUser }))
          this.router.navigate(['/dashboard']);
          localStorage.setItem('token', authUser.token)
        } else {
          this.notifierService.sendErrorNotification("Invalid email or password", "Auth error")
          this.store.dispatch(AuthActions.setAuthUser({ payload: null }));
        }

      },
      error: (err) => {

        if (err instanceof HttpErrorResponse) {
          let message = 'Ocurrio un error inespeado';
          if (err.status === 500) {
            message
          }
          if (err.status === 401) {
            message = 'Email o contrasena invalida';
          }
          this.notifierService.sendErrorNotification("Unexpected error", "Connection refused")
        }
      }
    })
  }

  logout(): void {
    localStorage.clear()
    this.store.dispatch(AuthActions.setAuthUser({ payload: null }))
    this.router.navigate(['/auth/login']);
  }

  private random() {
    return Math.random().toString(36).substr(2);
  };

  private token() {
    return this.random() + this.random();
  };

  register(payload: RegisterPayload): void {

    const user: CreateUser = {
      nombre: payload.name,
      apellido: payload.surname,
      email: payload.email,
      password: payload.password,
      token: this.token(),
      roleId: 1
    }

    this.httpClient.post<User>(environment.baseApiUrl + '/users', user)
      .pipe(
        mergeMap(
          (userCreated) => this.registerUser$.pipe(
            take(1),
            map(
              (arrayActual) => [...arrayActual, userCreated]
            )
          )
        )
      )
      .subscribe({
        next: (updatedArray) => {
          this._registerUser$.next(updatedArray);
          this._authUser$.next(updatedArray[0]);
          this.notifierService.sendSuccessNotification('User registered succesfully')
          this.router.navigate(['dashboard']);
        }
      })
  }
}
