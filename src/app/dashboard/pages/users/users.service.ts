import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateUser, User } from './models/user.model';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/core/services/notification.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  updateUserById(id: number, userUpdated: any) {
    throw new Error('Method not implemented.');
  }

  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor(private httpClient: HttpClient, private notifier: NotificationService) { }

  loadUsers(): void {
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users').subscribe({
      next: (response) => {
        this._users$.next(response);
      },
      error: () => {
        this.notifier.sendErrorNotification("Error charging students", "Connection refused")
      }
    })
  }

  getUsers(): Observable<User[]> {
    return this.users$
  }

  createUser(user: CreateUser) {

  }

  deleteUserById(id: number) {

  }
}
