import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EstudiantesComponent } from './estudiantes.component';
import { EstudiantesDetailComponent } from './pages/estudiantes-detail/estudiantes-detail.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EstudiantesComponent
      },
      {
        // /dashboard/students/:id
        path: ':id',
        component: EstudiantesDetailComponent,
      },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class EstudiantesRoutingModule { }
