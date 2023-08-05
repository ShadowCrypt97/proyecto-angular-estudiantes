import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { InscripcionesModule } from './pages/inscripciones/inscripciones.module';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,
    NavMenuComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    InscripcionesModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
