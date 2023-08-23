import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { RegisterPayload } from '../../models/authPayload.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { confirmPwdValidator } from 'src/app/shared/utils/formValidators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private notifier: NotificationService) {
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      surname: [null, [Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8)]]
    })
    this.registerForm.get('confirmPassword')?.setValidators(confirmPwdValidator(this.registerForm.get('password')));

  }

  register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.authService.register(this.registerForm.getRawValue())
    }
  }
}
