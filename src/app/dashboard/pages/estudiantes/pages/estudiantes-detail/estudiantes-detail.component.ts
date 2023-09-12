import { Component } from '@angular/core';
import { EstudiantesService } from '../../estudiantes.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student.model';
import { Observable, map, take } from 'rxjs';

@Component({
  selector: 'app-estudiantes-detail',
  templateUrl: './estudiantes-detail.component.html'
})
export class EstudiantesDetailComponent {
  public studentId: number;
  public student$: Observable<Student | undefined>;
  public studentName$: Observable<string | null>;
  public studentNumber$: Observable<number | null>;
  public studentRegisterDate$: Observable<Date | null>;
  public studentEmail$: Observable<string | undefined>;


  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private notification: NotificationService,
    private studentService: EstudiantesService
  ) {
    this.studentId = Number(this.activatedRoute.snapshot.params['id']);
    this.student$ = this.studentService.getStudentById(this.studentId);
    this.studentName$ = this.studentService.getStudentById(this.studentId).pipe(
      take(1),
      map((student) => { return student ? student.name + ' ' + student.surname : null })
    )
    this.studentNumber$ = this.studentService.getStudentById(this.studentId).pipe(
      take(1),
      map((student) => { return student ? student.id : null })
    )
    this.studentRegisterDate$ = this.studentService.getStudentById(this.studentId).pipe(
      take(1),
      map((student) => { return student ? student.registrationDate : null })
    )
    this.studentEmail$ = this.studentService.getStudentById(this.studentId).pipe(
      take(1),
      map((student) => { return student ? student.email : undefined })
    )
  }
}
