import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { CreateStudent, Student, UpdateStudent } from './models/student.model';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/core/services/notification.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private _students$ = new BehaviorSubject<Student[]>([]);
  private students$ = this._students$.asObservable();

  constructor(private httpClient: HttpClient, private notifier: NotificationService) {

  }

  loadStudents(): void {
    this.httpClient.get<Student[]>(environment.baseApiUrl + '/estudiantes').subscribe({
      next: (response) => {
        this._students$.next(response);
      },
      error: () => {
        this.notifier.sendErrorNotification("Error charging students", "Connection refused")
      }
    })
  }

  getStudents(): Observable<Student[]> {
    return this.students$
  }
  createStudents(student: CreateStudent): void {
    this.httpClient.post<Student>(environment.baseApiUrl + '/estudiantes', student)
      .pipe(
        mergeMap(
          (studentCreated) => this.students$.pipe(
            take(1),
            map(
              (arrayActual) => [...arrayActual, studentCreated]
            )
          )
        )
      )
      .subscribe({
        next: (updatedArray) => {
          this._students$.next(updatedArray)
        }
      })
  }

  updateStudentById(id: number, studentUpdated: UpdateStudent): void {
    this.httpClient.put<Student>(environment.baseApiUrl + '/estudiantes/' + id, studentUpdated)
      .pipe(
        mergeMap(
          (studentUpdated) => this.students$.pipe(
            take(1),
            map(
              (arrayActual) => arrayActual.map((student) => student.id === id ? { ...student, ...studentUpdated } : student))
          )
        )
      )
      .subscribe({
        next: (updatedArray) => this._students$.next(updatedArray)
      })
  }

  deleteStudentById(id: number): void {
    this.httpClient.delete(environment.baseApiUrl + '/estudiantes/' + id)
      .pipe(
        mergeMap(() =>
          this.students$.pipe(
            take(1),
            map((actualArray) => actualArray.filter((u) => u.id !== id))
          )
        )
      )
      .subscribe(
        {
          next: (updatedArray) => {
            this._students$.next(updatedArray)
          }
        }
      )
  }
}
