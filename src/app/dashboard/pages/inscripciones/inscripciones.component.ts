import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateInscription, Inscription, UpdateInscription } from './models/inscripciones.model';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { selectInscription } from './store/inscripciones.selectors';
import { InscripcionesActions } from './store/inscripciones.actions';
import { InscripcionesFormDialogsComponent } from './components/inscripciones-form-dialogs/inscripciones-form-dialogs.component';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent {
  inscriptions$: Observable<Inscription[]>;
  token!: string | null;

  constructor(
    private matDialog: MatDialog,
    private notificationService: NotificationService,
    private store: Store
  ) {
    this.inscriptions$ = this.store.select(selectInscription);
    this.store.select(selectAuthUser).subscribe({
      next: (authUser) => {
        this.token = authUser ? authUser.token : null
      }
    })
  }
  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadInscripciones())
  }

  onDeleteInscription(inscription: Inscription) {
    this.notificationService.sendConfirm("You won't be able to revert this!", `¿Are you sure to delete inscription ${inscription.id}?`)
      .then((result) => {
        if (result.isConfirmed) {
          //this.store.dispatch(InscripcionesActions.deleteInscription({ id: inscription.id }))
          this.notificationService.sendSuccessNotification(`The inscription ${inscription.id} has been deleted.`, 'Deleted!');
        }
      })
  }
  onEditInscription(inscriptionToEdit: Inscription) {
    this.matDialog
      .open(InscripcionesFormDialogsComponent, {
        data: inscriptionToEdit
      })
      .afterClosed()
      .subscribe({
        next: (inscriptionUpdated) => {
          if (inscriptionUpdated) {
            // this.store.dispatch(InscripcionesActions.updateInscription({
            //   id: inscriptionToEdit.id,
            //   payload: {
            //     studentId: inscriptionUpdated.studentId,
            //     courseId: inscriptionUpdated.courseId,
            //     subjectId: inscriptionUpdated.subjectId
            //   }
            // }))
            this.notificationService.sendSuccessNotification('Inscription modified succesfully');
          }
        }
      });
  }
  onCreateInscription() {
    this.matDialog
      .open(InscripcionesFormDialogsComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            const inscription: CreateInscription = {
              studentId: v.studentId,
              courseId: v.courseId,
              subjectId: v.subjectId
            }
            // this.store.dispatch(InscripcionesActions.createInscription({
            //   payload: inscription
            // }));
            this.notificationService.sendSuccessNotification('Inscription created succesfully')
          }
        }
      });
  }

}
