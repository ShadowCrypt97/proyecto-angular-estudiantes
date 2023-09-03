import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Role } from '../../../users/models/roles.model';
import { Subject } from '../../models/subejct.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectRole } from '../../../users/store/user.selectors';
import { MateriasActions } from '../../store/materias.actions';

@Component({
  selector: 'app-materias-form-dialogs',
  templateUrl: './materias-form-dialogs.component.html',
  styleUrls: ['./materias-form-dialogs.component.scss']
})
export class MateriasFormDialogsComponent {
  editingSubject?: Subject;
  subjectForm: FormGroup;

  private random() {
    return Math.random().toString(36).substr(2);
  };

  private token() {
    return this.random() + this.random();
  };

  constructor(
    private dialogRef: MatDialogRef<MateriasFormDialogsComponent>,
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data?: Subject
  ) {
    this.subjectForm = this.formBuilder.group(
      {
        subject_name: [null, [Validators.required, Validators.minLength(2)]],
        description: [null, [Validators.required, Validators.minLength(2)]]
      }
    )

    if (this.data) {
      this.editingSubject = this.data;
      this.subjectForm.get('subject_name')?.setValue(this.data.subject_name);
      this.subjectForm.get('description')?.setValue(this.data.description);
    }
  }
  ngOnInit(): void {
    this.store.dispatch(MateriasActions.loadMaterias())
  }
  onSubmit(): void {
    if (this.subjectForm.invalid) {
      this.subjectForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.subjectForm.value);
    }
  }
}
