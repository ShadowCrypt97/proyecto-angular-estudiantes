import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/dashboard/pages/estudiantes/models/student.model';

@Pipe({
  name: 'ConcatFullNamePipe'
})
export class ConcatFullNamePipe implements PipeTransform {

  transform(student: Student, ...args: unknown[]): unknown {
    const isUppercase = args[0] === 'uppercase';
    const fullName = `${student.name} ${student.surname}`;
    return isUppercase ? fullName.toUpperCase() : fullName;
  }

}
