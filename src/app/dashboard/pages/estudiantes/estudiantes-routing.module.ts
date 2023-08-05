import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EstudiantesComponent } from './estudiantes.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EstudiantesComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class EstudiantesRoutingModule { }
