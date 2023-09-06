import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { CursosDetailComponent } from './pages/cursos-detail/cursos-detail.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CursosComponent
      },
      {
        // /dashboard/users/:id
        path: ':id',
        component: CursosDetailComponent,
      },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class CursosRoutingModule { }
