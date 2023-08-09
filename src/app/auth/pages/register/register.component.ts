import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { RegisterPayload } from '../../models/authPayload.model';
import { NotificationService } from 'src/app/core/services/notification.service';

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
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    }
    else if ((this.registerForm.getRawValue() as RegisterPayload).password !== (this.registerForm.getRawValue() as RegisterPayload).confirmPassword) {
      this.notifier.sendErrorNotification('Confirm password is not the same to password', 'confirm password error')
    }
    else {
      this.authService.register(this.registerForm.getRawValue())
    }
  }
}
