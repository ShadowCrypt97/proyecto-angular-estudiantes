import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateSubject, Subject, UpdateSubject } from './models/subejct.model';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/core/services/notification.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private _subjects$ = new BehaviorSubject<Subject[]>([]);
  private subjects$ = this._subjects$.asObservable();
  constructor(private httpClient: HttpClient, private notifier: NotificationService) { }

  loadSubjects(): void {
    this.httpClient.get<Subject[]>(environment.baseApiUrl + '/subjects').subscribe({
      next: (response) => {
        this._subjects$.next(response);
      },
      error: () => {
        this.notifier.sendErrorNotification("Error charging subjects", "Connection refused")
      }
    })
  }

  getSubjects(): Observable<Subject[]> {
    return this.subjects$
  }

  createSubject(subject: CreateSubject): Observable<Subject> {
    return this.httpClient.post<Subject>(environment.baseApiUrl + '/subjects', subject);
  }

  updateSubjectById(id: number, subjectUpdated: UpdateSubject): Observable<Subject> {
    return this.httpClient.put<Subject>(environment.baseApiUrl + '/subjects/' + id, subjectUpdated)
  }

  deleteSubjectById(id: number) {
    return this.httpClient.delete<Subject>(environment.baseApiUrl + '/subjects/' + id);
  }
}
