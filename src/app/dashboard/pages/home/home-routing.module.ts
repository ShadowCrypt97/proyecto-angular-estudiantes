import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { EstudiantesComponent } from '../estudiantes/estudiantes.component';
import { CursosComponent } from '../cursos/cursos.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
