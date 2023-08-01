import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlErrorMessages'
})
export class ControlErrorMessagesPipe implements PipeTransform {

  transform(error: { key: string, value: any }, ...args: unknown[]): unknown {
    const errorMessages: Record<string, string> = {
      required: 'This field is required',
      email: 'Must be valid email address',
      minlength: 'The min length does not meet the required',
      maxlength: 'The max length does not meet the required'
    };

    return errorMessages[error.key] || 'Invalid field';
  }

}
