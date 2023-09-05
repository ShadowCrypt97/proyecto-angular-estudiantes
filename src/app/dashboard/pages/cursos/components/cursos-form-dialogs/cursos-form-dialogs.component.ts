import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models/course.model';
import { Observable } from 'rxjs';
import { Subject } from '../../../materias/models/subejct.model';
import { Store } from '@ngrx/store';
import { selectSubject } from '../../store/cursos.selectors';
import { CursosActions } from '../../store/cursos.actions';

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
          Validators.required
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
      console.log(this.editingCourse);
      this.courseForm.get('subjectId')?.setValue(this.data.subjectId);
      this.courseForm.get('initialDate')?.setValue(this.data.initialDate);
      this.courseForm.get('endDate')?.setValue(this.data.endDate);
    }
  }
  ngOnInit(): void {
    this.store.dispatch(CursosActions.loadSubject());
  }
  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      const course: Course = this.courseForm.value
      this.dialogRef.close(course);
    }
  }
}
