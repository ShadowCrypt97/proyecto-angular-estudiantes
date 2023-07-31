import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiantesComponent } from './estudiantes.component';
import { EstudiantesFormDialogsComponent } from './components/estudiantes-form-dialogs/estudiantes-form-dialogs.component';
import { EstudiantesTableComponent } from './components/estudiantes-table/estudiantes-table.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    EstudiantesComponent,
    EstudiantesFormDialogsComponent,
    EstudiantesTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    EstudiantesComponent
  ]
})
export class EstudiantesModule { }
