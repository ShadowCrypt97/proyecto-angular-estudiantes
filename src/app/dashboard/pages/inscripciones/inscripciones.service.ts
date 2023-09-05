import { Injectable } from '@angular/core';
import { Student } from '../estudiantes/models/student.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Course } from '../cursos/models/course.model';
import { Subject } from '../materias/models/subejct.model';
import { CreateInscription, Inscription, InscriptionExpanded, UpdateInscription } from './models/inscripciones.model';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(environment.baseApiUrl + '/students');
  }

  getCourseById(id: number) {
    return this.httpClient.get<Course>(`${environment.baseApiUrl}/courses/${id}?_expand=subject`);
  }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses?_expand=subject');
  }
  getSubjects(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(environment.baseApiUrl + '/subjects');
  }

  deleteInscriptionById(id: number) {
    return this.httpClient.delete<Inscription>(environment.baseApiUrl + '/inscripciones/' + id);
  }
  createInscription(payload: CreateInscription) {
    return this.httpClient.post<InscriptionExpanded>(environment.baseApiUrl + '/inscripciones', payload);
  }
}
