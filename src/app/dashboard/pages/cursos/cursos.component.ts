import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CursosService } from './cursos.service';
import { CursosFormDialogsComponent } from './components/cursos-form-dialogs/cursos-form-dialogs.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {
  public courses$: Observable<Course[]>;
  constructor(private matDialog: MatDialog,
    private coursesService: CursosService,
    private notificationService: NotificationService) {
    this.coursesService.loadCourses();
    this.courses$ = this.coursesService.getCourses();
  }

  onCreateCourse(): void {
    this.matDialog
      .open(CursosFormDialogsComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.coursesService.createCourse({
              id_subject: v.subjectId,
              initialDate: v.initialDate,
              endDate: v.endDate
            })
            this.notificationService.sendSuccessNotification('Course created succesfully')
          }
        }
      });
  }

  onDeleteCourse(course: Course): void {
    this.notificationService.sendConfirm("You won't be able to revert this!", `¿Are you sure to delete course ${course.id}?`)
      .then((result) => {
        if (result.isConfirmed) {
          this.coursesService.deleteCourseById(course.id);
          this.notificationService.sendSuccessNotification(`The course ${course.id} has been deleted.`, 'Deleted!');
        }
      })
  }

  onEditCourse(courseToEdit: Course): void {
    this.matDialog
      .open(CursosFormDialogsComponent, {
        data: courseToEdit
      })
      .afterClosed()
      .subscribe({
        next: (courseUpdated) => {
          if (courseUpdated) {
            this.coursesService.updateCourseById(courseToEdit.id, courseUpdated);
            this.notificationService.sendSuccessNotification('Course modified succesfully');
          }
        }
      });
  }
}
