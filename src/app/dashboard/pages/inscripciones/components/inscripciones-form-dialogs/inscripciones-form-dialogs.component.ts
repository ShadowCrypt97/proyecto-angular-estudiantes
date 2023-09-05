import { Component, Inject } from '@angular/core';
import { Inscription } from '../../models/inscripciones.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from '../../store/inscripciones.actions';
import { Student } from '../../../estudiantes/models/student.model';
import { Observable } from 'rxjs';
import { Course } from '../../../cursos/models/course.model';
import { Subject } from '../../../materias/models/subejct.model';
import { selectCourse, selectStudent, selectSubject } from '../../store/inscripciones.selectors';

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
  subjectOptions$: Observable<Subject[]>
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
    @Inject(MAT_DIALOG_DATA) private data?: Inscription
  ) {
    this.inscriptionForm = this.formBuilder.group(
      {
        student: [null, [Validators.required]],
        course: [null, [Validators.required]],
        subject: [null, [Validators.required]]
      }
    )

    if (this.data) {
      this.editingInscription = this.data;
      this.inscriptionForm.get('estudiante')?.setValue(this.data.studentId);
      this.inscriptionForm.get('curso')?.setValue(this.data.courseId);
      this.inscriptionForm.get('subject')?.setValue(this.data.subjectId);
    }

    this.studentOptions$ = this.store.select(selectStudent);
    this.courseOptions$ = this.store.select(selectCourse);
    this.subjectOptions$ = this.store.select(selectSubject);

  }
  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadStudents());
    this.store.dispatch(InscripcionesActions.loadCourses());
    this.store.dispatch(InscripcionesActions.loadSubjects());
  }
  onSubmit(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
    } else {
      const inscription: Inscription = this.inscriptionForm.value
      this.dialogRef.close(inscription);
    }
  }
}
