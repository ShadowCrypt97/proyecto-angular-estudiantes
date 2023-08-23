import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from '../../store/user.actions';
import { Observable } from 'rxjs';
import { Role } from '../../models/roles.model';
import { selectRole } from '../../store/user.selectors';
import { confirmPwdValidator } from 'src/app/shared/utils/formValidators';

@Component({
  selector: 'app-users-form-dialogs',
  templateUrl: './users-form-dialogs.component.html',
  styleUrls: ['./users-form-dialogs.component.scss']
})
export class UsersFormDialogsComponent implements OnInit {
  editingUser?: User;
  userForm: FormGroup;
  roleOptions$: Observable<Role[]>
  constructor(
    private dialogRef: MatDialogRef<UsersFormDialogsComponent>,
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data?: User
  ) {
    this.userForm = this.formBuilder.group(
      {
        name: [null, [Validators.required, Validators.minLength(2)]],
        surname: [null, [Validators.minLength(2)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
        role: [null, [Validators.required]]
      }
    )
    this.userForm.get('confirmPassword')?.setValidators(confirmPwdValidator(this.userForm.get('password')));

    if (this.data) {
      this.editingUser = this.data;
      this.userForm.get('name')?.setValue(this.data.nombre);
      this.userForm.get('surname')?.setValue(this.data.apellido);
      this.userForm.get('email')?.setValue(this.data.email || 'null');
      this.userForm.get('password')?.setValue(this.data.password || 'null');
      this.userForm.get('role')?.setValue(this.data.role || 'null');

    }

    this.roleOptions$ = this.store.select(selectRole)
  }
  ngOnInit(): void {
    this.store.dispatch(UserActions.loadRoles())
  }
  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      console.log(this.userForm.getRawValue())
      this.dialogRef.close(this.userForm.value);
    }
  }
}
