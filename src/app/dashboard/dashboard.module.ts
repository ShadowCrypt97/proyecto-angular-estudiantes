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
import { RouterModule } from '@angular/router';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NavMenuComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    EstudiantesModule,
    CursosModule,
    UsersModule,
    InscripcionesModule,
    SharedModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
