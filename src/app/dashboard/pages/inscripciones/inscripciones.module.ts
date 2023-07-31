import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    InscripcionesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    InscripcionesComponent
  ]
})
export class InscripcionesModule { }
