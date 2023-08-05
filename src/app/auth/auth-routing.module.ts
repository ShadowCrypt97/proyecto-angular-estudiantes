import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'register',
          component: RegisterComponent
        },
        {
          path: '**',
          redirectTo: 'login'
        }
      ]
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
