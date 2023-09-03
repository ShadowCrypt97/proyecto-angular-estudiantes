import { Component } from '@angular/core';
import { Subject } from './models/subejct.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { MateriasActions } from './store/materias.actions';
import { MateriasFormDialogsComponent } from './components/materias-form-dialogs/materias-form-dialogs.component';
import { selectMateria } from './store/materias.selectors';
import { MateriasService } from './materias.service';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent {
  public subjects$: Observable<Subject[]>;
  token!: string | null;

  constructor(
    private matDialog: MatDialog,
    private notificationService: NotificationService,
    private store: Store
  ) {
    this.subjects$ = this.store.select(selectMateria);
    this.store.select(selectAuthUser).subscribe({
      next: (authUser) => {
        this.token = authUser ? authUser.token : null
      }
    })
  }
  ngOnInit(): void {
    this.store.dispatch(MateriasActions.loadMaterias())
  }
  onCreateSubject(): void {
    this.matDialog
      .open(MateriasFormDialogsComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            const subject = {
              subject_name: v.subject_name,
              description: v.description
            }
            this.store.dispatch(MateriasActions.createMaterias({
              payload: subject
            }));
            this.notificationService.sendSuccessNotification('Subject created succesfully')
          }
        }
      });
  }

  onDeleteSubject(subject: Subject): void {
    this.notificationService.sendConfirm("You won't be able to revert this!", `¿Are you sure to delete subject ${subject.subject_name}?`)
      .then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(MateriasActions.deleteMaterias({ id: subject.id }))
          this.notificationService.sendSuccessNotification(`The user ${subject.subject_name} has been deleted.`, 'Deleted!');
        }
      })
  }

  onEditSubject(subjectToEdit: Subject): void {
    this.matDialog
      .open(MateriasFormDialogsComponent, {
        data: subjectToEdit
      })
      .afterClosed()
      .subscribe({
        next: (subjectUpdated) => {
          if (subjectUpdated) {
            this.store.dispatch(MateriasActions.updateMaterias({
              id: subjectToEdit.id,
              payload: {
                subject_name: subjectUpdated.subject_name,
                description: subjectUpdated.description
              }
            }))
            this.notificationService.sendSuccessNotification('Subject modified succesfully');
          }
        }
      });
  }
}
