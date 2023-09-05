import { Component, Inject } from '@angular/core';
import { Inscription } from '../../models/inscripciones.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from '../../store/inscripciones.actions';
import { Student } from '../../../estudiantes/models/student.model';
import { Observable, take } from 'rxjs';
import { Course } from '../../../cursos/models/course.model';
import { selectCourse, selectStudent } from '../../store/inscripciones.selectors';
import { HttpClient } from '@angular/common/http';
import { InscripcionesService } from '../../inscripciones.service';

@Component({
  selector: 'app-inscripciones-form-dialogs',
  templateUrl: './inscripciones-form-dialogs.component.html',
  styleUrls: ['./inscripciones-form-dialogs.component.scss']
})
export class InscripcionesFormDialogsComponent {
  editingInscription?: Inscription;
  inscriptionForm: FormGroup;
  studentOptions$: Observable<Student[]>
  courseOptions$: Observable<Course[]>
  private random() {
    return Math.random().toString(36).substr(2);
  };

  private token() {
    return this.random() + this.random();
  };

  constructor(
    private dialogRef: MatDialogRef<InscripcionesFormDialogsComponent>,
    private formBuilder: FormBuilder,
    private store: Store,
    private inscriptionsService: InscripcionesService,
    @Inject(MAT_DIALOG_DATA) private data?: Inscription
  ) {
    this.inscriptionForm = this.formBuilder.group(
      {
        student: [null, [Validators.required]],
        course: [null, [Validators.required]]
      }
    )

    this.studentOptions$ = this.store.select(selectStudent);
    this.courseOptions$ = this.store.select(selectCourse);
  }
  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadStudents());
    this.store.dispatch(InscripcionesActions.loadCourses());
  }
  onSubmit(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
    } else {
      let inscription = this.inscriptionForm.value
      this.inscriptionsService.getCourseById(inscription.course).pipe(
        take(1)
      ).subscribe({
        next: (course) => {
          inscription = {
            ...inscription,
            subject: course.subjectId
          }
          this.dialogRef.close(inscription);
        }
      })
    }
  }
}
