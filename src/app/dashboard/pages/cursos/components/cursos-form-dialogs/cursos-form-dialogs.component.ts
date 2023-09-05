import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models/course.model';
import { Observable } from 'rxjs';
import { Subject } from '../../../materias/models/subejct.model';
import { Store } from '@ngrx/store';
import { selectSubject } from '../../store/cursos.selectors';

@Component({
  selector: 'app-cursos-form-dialogs',
  templateUrl: './cursos-form-dialogs.component.html',
  styleUrls: ['./cursos-form-dialogs.component.scss']
})
export class CursosFormDialogsComponent {
  editingCourse?: Course;
  courseForm: FormGroup;
  subjectOptions$: Observable<Subject[]>

  constructor(
    private dialogRef: MatDialogRef<CursosFormDialogsComponent>,
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data?: Course
  ) {
    this.courseForm = this.formBuilder.group(
      {
        subjectId: [null, [
          Validators.required,
          Validators.maxLength(3)
        ]
        ],
        initialDate: [null, [
          Validators.required
        ]],
        endDate: [null, [
          Validators.required
        ]]
      }
    )
    this.subjectOptions$ = this.store.select(selectSubject);

    if (this.data) {
      this.editingCourse = this.data;
      this.courseForm.get('subjectId')?.setValue(this.data.subjectId);
      this.courseForm.get('initialDate')?.setValue(this.data.initialDate);
      this.courseForm.get('endDate')?.setValue(this.data.endDate);
    }
  }
  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.courseForm.value);
    }
  }
}
