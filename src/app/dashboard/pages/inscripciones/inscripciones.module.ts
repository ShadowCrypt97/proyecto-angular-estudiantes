import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';



@NgModule({
  declarations: [
    InscripcionesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InscripcionesRoutingModule
  ],
  exports: [
    InscripcionesComponent
  ]
})
export class InscripcionesModule { }
