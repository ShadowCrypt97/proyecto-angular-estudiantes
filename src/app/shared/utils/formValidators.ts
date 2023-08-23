import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmPwdValidator(controlPassword: AbstractControl<any, any> | null): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control instanceof FormControl) {
            if (
                control.value !== controlPassword?.value
            ) {
                return {
                    confirmPwdDiff: true,
                };
            }
        }

        return null;
    };
}