import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { EstudiantesService } from './estudiantes.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { EstudiantesFormDialogsComponent } from './components/estudiantes-form-dialogs/estudiantes-form-dialogs.component';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent {
  public students$: Observable<Student[]>;
  constructor(private matDialog: MatDialog,
    private studentService: EstudiantesService,
    private notificationService: NotificationService) {
    this.studentService.loadUsers();
    this.students$ = this.studentService.getDoctors();
  }

  onCreateDoctor(): void {
    this.matDialog
      .open(EstudiantesFormDialogsComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.studentService.createDoctor({
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

  onDeleteDoctor(student: Student): void {
    this.notificationService.sendConfirm("You won't be able to revert this!", `¿Are you sure to delete student ${student.name}?`)
      .then((result) => {
        if (result.isConfirmed) {
          this.studentService.deleteDoctorById(student.id_student);
          this.notificationService.sendSuccessNotification(`The student ${student.name} has been deleted.`, 'Deleted!');
        }
      })
  }

  onEditDoctor(studentToEdit: Student): void {
    this.matDialog
      .open(EstudiantesFormDialogsComponent, {
        data: studentToEdit
      })
      .afterClosed()
      .subscribe({
        next: (studentUpdated) => {
          if (studentUpdated) {
            this.studentService.updateDoctorById(studentToEdit.id_student, studentUpdated);
            this.notificationService.sendSuccessNotification('Student modified succesfully');
          }
        }
      });
  }
}
