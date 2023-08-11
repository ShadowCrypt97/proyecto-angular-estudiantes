import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { CreateUser, LoginPayload, RegisterPayload, User } from './models/authPayload.model';
import { NotificationService } from '../core/services/notification.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUser$ = new BehaviorSubject<User | null>(null);
  public authUser$ = this._authUser$.asObservable();

  private _registerUser$ = new BehaviorSubject<User[]>([]);
  public registerUser$ = this._registerUser$.asObservable();

  constructor(private notifierService: NotificationService, private router: Router, private httpClient: HttpClient) { }

  isAuthenticated(): Observable<Boolean> {
    return this.httpClient.get<User[]>('http://localhost:3000/users', {
      params: {
        token: localStorage.getItem('token') || ''
      }
    }).pipe(
      map((userResult) => {
        return !!userResult.length
      })
    )
  }

  login(payload: LoginPayload): void {

    this.httpClient.get<User[]>('http://localhost:3000/users').subscribe({
      next: (response) => {
        response.forEach(user => {
          if (payload.email === user.email && payload.password === user.password) {
            this._authUser$.next(user);
            this.router.navigate(['/dashboard']);
            localStorage.setItem('token', user.token)
          }
        });

        this.authUser$.subscribe({
          next: (user) => {
            if (!user) {
              this.notifierService.sendErrorNotification("Invalid email or password", "Auth error")
            }
          }
        })

      },
      error: () => {
        this.notifierService.sendErrorNotification("Unexpected error", "Connection refused")
      }
    })
  }

  logout(): void {
    localStorage.clear();
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
      role: "admin"
    }

    this.httpClient.post<User>('http://localhost:3000/users', user)
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
          this.router.navigate(['dashboard']);
        }
      })
  }
}
