import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-cursos-table',
  templateUrl: './cursos-table.component.html',
  styleUrls: ['./cursos-table.component.scss']
})
export class CursosTableComponent {
  displayedColumns: string[] = ['idCourse', 'idSubject', 'initialDate', 'endDate', 'actions'];

  @Input()
  dataSource: Course[] = [];

  @Output()
  deleteCourse = new EventEmitter<Course>();

  @Output()
  editCourse = new EventEmitter<Course>();

  constructor() { }
}
