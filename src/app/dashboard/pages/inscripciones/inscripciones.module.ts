import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { InscripcionesFormDialogsComponent } from './components/inscripciones-form-dialogs/inscripciones-form-dialogs.component';
import { InscripcionesTableComponent } from './components/inscripciones-table/inscripciones-table.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionesEffects } from './store/inscripciones.effects';
import { inscripcionesFeature } from './store/inscripciones.reducer';

@NgModule({
  declarations: [
    InscripcionesComponent,
    InscripcionesFormDialogsComponent,
    InscripcionesTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InscripcionesRoutingModule,
    StoreModule.forFeature(inscripcionesFeature),
    EffectsModule.forFeature([InscripcionesEffects])
  ],
  exports: [
    InscripcionesComponent
  ]
})
export class InscripcionesModule { }
