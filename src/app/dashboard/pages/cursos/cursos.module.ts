import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { CursosFormDialogsComponent } from './components/cursos-form-dialogs/cursos-form-dialogs.component';
import { CursosTableComponent } from './components/cursos-table/cursos-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CursosRoutingModule } from './cursos-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from './store/cursos.effects';
import { cursosFeature } from './store/cursos.reducer';



@NgModule({
  declarations: [
    CursosComponent,
    CursosFormDialogsComponent,
    CursosTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CursosRoutingModule,
    StoreModule.forFeature(cursosFeature),
    EffectsModule.forFeature([CursosEffects])
  ],
  exports: [
    CursosComponent
  ]
})
export class CursosModule { }
