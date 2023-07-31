import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../models/student.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-estudiantes-form-dialogs',
  templateUrl: './estudiantes-form-dialogs.component.html',
  styleUrls: ['./estudiantes-form-dialogs.component.scss']
})
export class EstudiantesFormDialogsComponent {
  editingStudent?: Student;
  studentForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<EstudiantesFormDialogsComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data?: Student
  ) {
    this.studentForm = this.formBuilder.group(
      {
        name: [null, [
          Validators.required,
          Validators.minLength(2)
        ]
        ],
        surname: [null, [
          Validators.required,
          Validators.minLength(2)
        ]],
        email: [null, [
          Validators.email
        ]]
      }
    )

    if (this.data) {
      this.editingStudent = this.data;
      this.studentForm.get('name')?.setValue(this.data.name);
      this.studentForm.get('surname')?.setValue(this.data.surname);
      this.studentForm.get('email')?.setValue(this.data.email || 'null');
    }
  }
  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.studentForm.value);
    }
  }
}
