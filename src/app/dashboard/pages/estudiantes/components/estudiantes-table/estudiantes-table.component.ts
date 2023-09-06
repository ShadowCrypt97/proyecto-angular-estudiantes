import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models/student.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-estudiantes-table',
  templateUrl: './estudiantes-table.component.html',
  styleUrls: ['./estudiantes-table.component.scss']
})
export class EstudiantesTableComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'registrationDate', 'actions'];
  public isAdmin$: Observable<boolean>;
  @Input()
  dataSource: Student[] = [];

  @Output()
  deleteStudent = new EventEmitter<Student>();

  @Output()
  editStudent = new EventEmitter<Student>();

  constructor(private store: Store) {
    this.isAdmin$ = this.store.select(selectAuthIsAdmin)
  }
}
