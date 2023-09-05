import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CreateCourse, expandedCourse } from './models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CursosService } from './cursos.service';
import { CursosFormDialogsComponent } from './components/cursos-form-dialogs/cursos-form-dialogs.component';
import { Store } from '@ngrx/store';
import { Subject } from '../materias/models/subejct.model';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { CursosActions } from './store/cursos.actions';
import { selectCourse } from './store/cursos.selectors';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {
  public courses$: Observable<expandedCourse[]>;
  token!: string | null;

  constructor(private matDialog: MatDialog,
    private coursesService: CursosService,
    private notificationService: NotificationService,
    private store: Store) {
    this.courses$ = this.store.select(selectCourse);
    this.store.select(selectAuthUser).subscribe({
      next: (authUser) => {
        this.token = authUser ? authUser.token : null
      }
    })
  }
  ngOnInit(): void {
    this.store.dispatch(CursosActions.loadCursos())
  }

  onCreateCourse(): void {
    this.matDialog
      .open(CursosFormDialogsComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            const course: CreateCourse = {
              subjectId: v.subjectId,
              initialDate: v.initialDate,
              endDate: v.endDate
            }
            this.store.dispatch(CursosActions.createCourses({
              payload: course
            }));
            this.notificationService.sendSuccessNotification('Course created succesfully')
          }
        }
      });
  }

  onDeleteCourse(course: Course): void {
    this.notificationService.sendConfirm("You won't be able to revert this!", `¿Are you sure to delete course ${course.id}?`)
      .then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(CursosActions.deleteCourses({ id: course.id }))
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
            this.store.dispatch(CursosActions.updateCourses({
              id: courseToEdit.id,
              payload: {
                subjectId: courseUpdated.subjectId,
                initialDate: courseUpdated.initialDate,
                endDate: courseUpdated.endDate
              }
            }));
            this.notificationService.sendSuccessNotification('Course modified succesfully');
          }
        }
      });
  }
}
