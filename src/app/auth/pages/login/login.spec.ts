import { TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { SharedModule } from "src/app/shared/shared.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService } from "../../auth.service";

describe('LoginComponent', () => {
    let component: LoginComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                SharedModule,
                HttpClientTestingModule
            ]
        })
        component = TestBed.createComponent(LoginComponent).componentInstance
    })

    it('The component must be invalid if all fields keep voids', () => {
        component.loginForm.get('email')?.setValue('');
        component.loginForm.get('password')?.setValue('');
        expect(component.loginForm.invalid).toBeTrue();
    })

    it('When login() will be called and the form will be invalid, should be called the method markAllAsTouched of the prop LoginForm', () => {
        const spyOfMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');
        component.login();
        expect(spyOfMarkAllAsTouched).toHaveBeenCalled();
    })

    it('When login() will be called and the form will be valid, should be called the method login() of service AuthService', () => {
        const authService = TestBed.inject(AuthService);
        component.loginForm.get('email')?.setValue('email@mail.com');
        component.loginForm.get('password')?.setValue('asgaasgq');
        expect(component.loginForm.valid).toBeTrue();
        const spyOfAuthServiceLogin = spyOn(authService, 'login');
        component.login();
        expect(spyOfAuthServiceLogin).toHaveBeenCalled();
    })
})