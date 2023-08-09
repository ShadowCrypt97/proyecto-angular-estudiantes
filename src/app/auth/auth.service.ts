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

  MOCK_USER: User = {
    id: 1,
    nombre: 'Pepito',
    apellido: 'Perez',
    email: 'pepito@gmail.com',
    password: '12345678',
    token: 'ASgasasdasgasASF849648asga',
    role: 'Admin'
  }

  constructor(private notifierService: NotificationService, private router: Router, private httpClient: HttpClient) { }

  isAuthenticated(): Observable<Boolean> {
    return this.authUser$.pipe(
      take(1),
      map((user) => !!user)
    )
  }

  login(payload: LoginPayload): void {
    if (payload.email === this.MOCK_USER.email && payload.password === this.MOCK_USER.password) {
      this._authUser$.next(this.MOCK_USER);
      this.router.navigate(['/dashboard']);
    } else {
      this.notifierService.sendErrorNotification('Invalid email or password', 'Auth error')
      this._authUser$.next(null);
    }
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
