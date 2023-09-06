import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Store } from '@ngrx/store';
import { Course } from '../../models/course.model';
import { CursosActions } from '../../store/cursos.actions';
import { selectCourseDescription, selectCourseId, selectCourseName, selectEndDate, selectIniDate } from '../../store/cursos.selectors';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cursos-detail',
  templateUrl: './cursos-detail.component.html'
})
export class CursosDetailComponent {
  public course: Course | null = null;
  public courseId?: number;
  public courseName$: Observable<string | undefined>;
  public courseDescription$: Observable<string | undefined>;
  public courseId$: Observable<number | undefined>;
  public iniDate$: Observable<string | undefined>;
  public endDate$: Observable<string | undefined>;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private notification: NotificationService,
    private store: Store
  ) {
    this.courseName$ = this.store.select(selectCourseName)
    this.courseDescription$ = this.store.select(selectCourseDescription)
    this.courseId$ = this.store.select(selectCourseId)
    this.iniDate$ = this.store.select(selectIniDate)
    this.endDate$ = this.store.select(selectEndDate)

    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.router.navigate(['dashboard', 'courses']);
      this.notification.sendErrorNotification(`${this.activatedRoute.snapshot.params['id']} no es un ID valido`);
    } else {
      this.courseId = Number(this.activatedRoute.snapshot.params['id']);
      this.loadUser()
    }
  }

  loadUser(): void {
    if (this.courseId) {
      this.store.dispatch(CursosActions.loadCursosDetail({ id: this.courseId }));
    }
  }
}
