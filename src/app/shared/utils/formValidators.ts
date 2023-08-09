import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmPwdValidator(password: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control instanceof FormControl) {
            if (
                control.value !== password
            ) {
                return {
                    confirmPwdDiff: true,
                };
            }
        }

        return null;
    };
}