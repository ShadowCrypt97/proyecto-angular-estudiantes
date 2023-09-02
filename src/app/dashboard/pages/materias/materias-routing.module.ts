import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MateriasComponent } from './materias.component';

const routes: Routes = [
  {
    path: '',
    component: MateriasComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriasRoutingModule { }
