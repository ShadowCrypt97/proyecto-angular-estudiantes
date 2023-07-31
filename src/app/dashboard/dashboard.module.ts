import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { EstudiantesModule } from './pages/estudiantes/estudiantes.module';
import { CursosComponent } from './pages/cursos/cursos.component';
import { UsersComponent } from './pages/users/users.component';
import { InscripcionesComponent } from './pages/inscripciones/inscripciones.component';
import { CursosModule } from './pages/cursos/cursos.module';
import { InscripcionesModule } from './pages/inscripciones/inscripciones.module';
import { UsersModule } from './pages/users/users.module';



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    EstudiantesModule,
    CursosModule,
    UsersModule,
    InscripcionesModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
