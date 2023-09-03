import { Component, OnInit } from '@angular/core';
import { UpdateUser, User } from './models/user.model';
import { UsersFormDialogsComponent } from './components/users-form-dialogs/users-form-dialogs.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from './users.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Store } from '@ngrx/store';
import { UserActions } from './store/user.actions';
import { selectUser } from './store/user.selectors';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users$: Observable<User[]>;
  token!: string | null;

  constructor(
    private matDialog: MatDialog,
    private notificationService: NotificationService,
    private store: Store
  ) {
    this.users$ = this.store.select(selectUser);
    this.store.select(selectAuthUser).subscribe({
      next: (authUser) => {
        this.token = authUser ? authUser.token : null
      }
    })
  }
  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers())
  }
  onCreateUser(): void {
    this.matDialog
      .open(UsersFormDialogsComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            const user = {
              nombre: v.name,
              apellido: v.surname,
              email: v.email,
              password: v.password,
              token: this.token,
              roleId: v.role
            }
            this.store.dispatch(UserActions.createUser({
              payload: user
            }));
            this.notificationService.sendSuccessNotification('User created succesfully')
          }
        }
      });
  }

  onDeleteUser(user: User): void {
    this.notificationService.sendConfirm("You won't be able to revert this!", `¿Are you sure to delete user ${user.nombre}?`)
      .then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(UserActions.deleteUser({ id: user.id }))
          this.notificationService.sendSuccessNotification(`The user ${user.nombre} has been deleted.`, 'Deleted!');
        }
      })
  }

  onEditUser(userToEdit: User): void {
    this.matDialog
      .open(UsersFormDialogsComponent, {
        data: userToEdit
      })
      .afterClosed()
      .subscribe({
        next: (userUpdated) => {
          if (userUpdated) {
            this.store.dispatch(UserActions.updateUser({
              id: userToEdit.id,
              payload: {
                nombre: userUpdated.name,
                apellido: userUpdated.surname,
                password: userUpdated.password,
                email: userUpdated.email,
                roleId: userUpdated.role,
                token: userToEdit.token
              }
            }))
            this.notificationService.sendSuccessNotification('User modified succesfully');
          }
        }
      });
  }
}
