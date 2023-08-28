import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { roleGuard } from '../core/guards/role.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'home',
        loadChildren: () => import("./pages/home/home.module").then((m) => m.HomeModule)
      },
      {
        path: 'students',
        loadChildren: () => import("./pages/estudiantes/estudiantes.module").then((m) => m.EstudiantesModule)
      },
      {
        path: 'courses',
        loadChildren: () => import("./pages/cursos/cursos.module").then((m) => m.CursosModule)
      },
      {
        path: 'users',
        canActivate: [roleGuard],
        loadChildren: () => import("./pages/users/users.module").then((m) => m.UsersModule)
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
