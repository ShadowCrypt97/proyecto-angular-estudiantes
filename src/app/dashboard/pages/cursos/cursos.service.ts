import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, take } from 'rxjs';
import { Course, CreateCourse, UpdateCourse } from './models/course.model';

const CURSOS_DB: Observable<Course[]> = of(
  [
    {
      id_course: 1,
      id_subject: 1,
      initialDate: "01/01/2023",
      endDate: "01/07/2023"
    },
    {
      id_course: 2,
      id_subject: 2,
      initialDate: "01/01/2023",
      endDate: "01/07/2023"
    },
    {
      id_course: 3,
      id_subject: 3,
      initialDate: "01/01/2023",
      endDate: "01/07/2023"
    }
  ]
).pipe(delay(1000));

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private _courses$ = new BehaviorSubject<Course[]>([]);
  private courses$ = this._courses$.asObservable();

  constructor() {

  }

  loadCourses(): void {
    CURSOS_DB.subscribe({
      next: (coursesfromDB) => this._courses$.next(coursesfromDB)
    })

  }

  getCourses(): Observable<Course[]> {
    return this.courses$
  }
  createCourse(course: CreateCourse): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (actualArray) => {
        this._courses$.next([...actualArray, { ...course, id_course: actualArray.length + 1 }])
        console.log(course)
      }
    })
  }

  updateCourseById(id: number, courseUpdated: UpdateCourse): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (actualArray) => {
        this._courses$.next(
          actualArray.map((course) => (course.id_course === id) ? { ...course, ...courseUpdated } : course)
        )
      }
    })
  }

  deleteCourseById(id: number): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (actualArray) => {
        this._courses$.next(actualArray.filter((courseToDelete) => courseToDelete.id_course !== id))
      }
    })
  }
}
