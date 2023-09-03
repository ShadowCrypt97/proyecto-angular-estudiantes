import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inscription } from '../../models/inscripciones.model';

@Component({
  selector: 'app-inscripciones-table',
  templateUrl: './inscripciones-table.component.html',
  styleUrls: ['./inscripciones-table.component.scss']
})
export class InscripcionesTableComponent {
  displayedColumns: string[] = ['id', 'student', 'course', 'subject', 'actions'];

  @Input()
  dataSource: Inscription[] = [];

  @Output()
  deleteInscription = new EventEmitter<Inscription>();

  @Output()
  editInscription = new EventEmitter<Inscription>();
}
