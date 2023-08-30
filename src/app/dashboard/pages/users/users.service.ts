import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { CreateUser, UpdateUser, User, UserWithRole } from './models/user.model';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/core/services/notification.service';
import { environment } from 'src/environments/environment';
import { Role } from './models/roles.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _users$ = new BehaviorSubject<UserWithRole[]>([]);
  private users$ = this._users$.asObservable();

  constructor(private httpClient: HttpClient, private notifier: NotificationService) { }

  loadUsers(): void {
    this.httpClient.get<UserWithRole[]>(environment.baseApiUrl + '/users?_expand=role').subscribe({
      next: (response) => {
        this._users$.next(response);
      },
      error: () => {
        this.notifier.sendErrorNotification("Error charging students", "Connection refused")
      }
    })
  }

  getUsers(): Observable<UserWithRole[]> {
    return this.users$
  }

  getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(environment.baseApiUrl + '/roles');
  }

  createUser(user: CreateUser): Observable<UserWithRole> {
    return this.httpClient.post<UserWithRole>(environment.baseApiUrl + '/users', user);
  }

  updateUserById(id: number, userUpdated: UpdateUser): Observable<UserWithRole> {
    return this.httpClient.put<UserWithRole>(environment.baseApiUrl + '/users/' + id, userUpdated)
  }

  deleteUserById(id: number) {

  }
}
