import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-estudiantes-table',
  templateUrl: './estudiantes-table.component.html',
  styleUrls: ['./estudiantes-table.component.scss']
})
export class EstudiantesTableComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'registrationDate', 'actions'];

  @Input()
  dataSource: Student[] = [];

  @Output()
  deleteDoctor = new EventEmitter<Student>();

  @Output()
  editDoctor = new EventEmitter<Student>();

  constructor() { }
}
