import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CreateCourse, UpdateCourse, expandedCourse } from './models/course.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from '../materias/models/subejct.model';


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private httpClient: HttpClient) {

  }

  getSubjects(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(environment.baseApiUrl + '/roles');
  }

  createCourse(course: CreateCourse): Observable<expandedCourse> {
    return this.httpClient.post<expandedCourse>(environment.baseApiUrl + '/courses', course);
  }

  updateCourseById(id: number, courseUpdated: UpdateCourse): Observable<expandedCourse> {
    return this.httpClient.put<expandedCourse>(environment.baseApiUrl + '/courses/' + id, courseUpdated)
  }

  deleteCourseById(id: number) {
    return this.httpClient.delete<Course>(environment.baseApiUrl + '/courses/' + id);
  }
}
