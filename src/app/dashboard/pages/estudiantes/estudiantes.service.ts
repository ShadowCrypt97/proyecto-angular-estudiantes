import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, take } from 'rxjs';
import { CreateStudent, Student, UpdateStudent } from './models/student.model';

const STUDENT_DB: Observable<Student[]> = of(
  [
    {
      id_student: 1,
      name: "Camila",
      surname: "Cuervo",
      email: "camila.cuervo@gmail.com",
      registrationDate: new Date()
    },
    {
      id_student: 2,
      name: "Carlos",
      surname: "Caceres",
      registrationDate: new Date()
    },
    {
      id_student: 3,
      name: "Alveiro",
      surname: "Tarsisio",
      email: "alveiro.tarsicio@gmail.com",
      registrationDate: new Date()
    }
  ]
).pipe(delay(1000));

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private _students$ = new BehaviorSubject<Student[]>([]);
  private students$ = this._students$.asObservable();

  constructor() {

  }

  loadStudents(): void {
    STUDENT_DB.subscribe({
      next: (studentsfromDB) => this._students$.next(studentsfromDB)
    })

  }

  getStudents(): Observable<Student[]> {
    return this.students$
  }
  createStudents(student: CreateStudent): void {
    this.students$.pipe(take(1)).subscribe({
      next: (actualArray) => {
        this._students$.next([...actualArray, { ...student, id_student: actualArray.length + 1 }])
      }
    })
  }

  updateStudentById(id: number, studentUpdated: UpdateStudent): void {
    this.students$.pipe(take(1)).subscribe({
      next: (actualArray) => {
        this._students$.next(
          actualArray.map((student) => (student.id_student === id) ? { ...student, ...studentUpdated } : student)
        )
      }
    })
  }

  deleteStudentById(id: number): void {
    this.students$.pipe(take(1)).subscribe({
      next: (actualArray) => {
        this._students$.next(actualArray.filter((studentToDelete) => studentToDelete.id_student !== id))
      }
    })
  }
}
