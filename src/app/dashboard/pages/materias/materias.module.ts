import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriasRoutingModule } from './materias-routing.module';
import { MateriasFormDialogsComponent } from './components/materias-form-dialogs/materias-form-dialogs.component';
import { MateriasTableComponent } from './components/materias-table/materias-table.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromMaterias from './store/materias.reducer';
import { MateriasEffects } from './store/materias.effects';
import { SharedModule } from 'src/app/shared/shared.module';
import { MateriasComponent } from './materias.component';



@NgModule({
  declarations: [
    MateriasComponent,
    MateriasFormDialogsComponent,
    MateriasTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MateriasRoutingModule,
    EffectsModule.forFeature([MateriasEffects]),
    StoreModule.forFeature(fromMaterias.materiasFeature)
  ],
  exports: [
    MateriasComponent
  ]
})
export class MateriasModule { }
