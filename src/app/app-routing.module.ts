import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { EstudiantesComponent } from './dashboard/pages/estudiantes/estudiantes.component';
import { CursosComponent } from './dashboard/pages/cursos/cursos.component';
import { HomeComponent } from './dashboard/pages/home/home.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'students',
        component: EstudiantesComponent
      },
      {
        path: 'courses',
        component: CursosComponent
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '**',
    redirectTo: '/auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
