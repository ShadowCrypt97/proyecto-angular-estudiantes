import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { LoginPayload, User } from './models/loginPayload.model';
import { NotificationService } from '../core/services/notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUser$ = new BehaviorSubject<User | null>(null);
  public authUser$ = this._authUser$.asObservable();
  MOCK_USER: User = {
    id: 1,
    nombre: 'Pepito',
    apellido: 'Perez',
    email: 'pepito@gmail.com',
    password: '12345678',
    token: 'ASgasasdasgasASF849648asga',
    role: 'Admin'
  }

  constructor(private notifierService: NotificationService, private router: Router) { }

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
}
