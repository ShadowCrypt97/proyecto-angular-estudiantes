import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { EstudiantesModule } from './pages/estudiantes/estudiantes.module';
import { CursosModule } from './pages/cursos/cursos.module';
import { InscripcionesModule } from './pages/inscripciones/inscripciones.module';
import { UsersModule } from './pages/users/users.module';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    EstudiantesModule,
    CursosModule,
    UsersModule,
    InscripcionesModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
