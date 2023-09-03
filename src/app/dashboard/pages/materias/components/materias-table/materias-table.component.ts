import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from '../../models/subejct.model';

@Component({
  selector: 'app-materias-table',
  templateUrl: './materias-table.component.html',
  styleUrls: ['./materias-table.component.scss']
})
export class MateriasTableComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  @Input()
  dataSource: Subject[] = [];

  @Output()
  deleteSubject = new EventEmitter<Subject>();

  @Output()
  editSubject = new EventEmitter<Subject>();
}
