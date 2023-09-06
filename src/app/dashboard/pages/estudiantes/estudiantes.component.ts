import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { EstudiantesFormDialogsComponent } from './components/estudiantes-form-dialogs/estudiantes-form-dialogs.component';
import { EstudiantesService } from './estudiantes.service';
import { Store } from '@ngrx/store';
import { selectAuthIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent {
  public students$: Observable<Student[]>;
  public isAdmin$: Observable<boolean>;
  constructor(private matDialog: MatDialog,
    private studentService: EstudiantesService,
    private notificationService: NotificationService,
    private store: Store,
  ) {
    this.studentService.loadStudents();
    this.students$ = this.studentService.getStudents();
    this.isAdmin$ = this.store.select(selectAuthIsAdmin)
  }

  onCreateStudent(): void {
    this.matDialog
      .open(EstudiantesFormDialogsComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.studentService.createStudents({
              name: v.name,
              surname: v.surname,
              email: v.email,
              registrationDate: new Date()
            })
            this.notificationService.sendSuccessNotification('Student created succesfully')
          }
        }
      });
  }

  onDeleteStudent(student: Student): void {
    this.notificationService.sendConfirm("You won't be able to revert this!", `¿Are you sure to delete student ${student.name}?`)
      .then((result) => {
        if (result.isConfirmed) {
          this.studentService.deleteStudentById(student.id);
          this.notificationService.sendSuccessNotification(`The student ${student.name} has been deleted.`, 'Deleted!');
        }
      })
  }

  onEditStudent(studentToEdit: Student): void {
    this.matDialog
      .open(EstudiantesFormDialogsComponent, {
        data: studentToEdit
      })
      .afterClosed()
      .subscribe({
        next: (studentUpdated) => {
          if (studentUpdated) {
            this.studentService.updateStudentById(studentToEdit.id, studentUpdated);
            this.notificationService.sendSuccessNotification('Student modified succesfully');
          }
        }
      });
  }
}
