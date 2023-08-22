import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersFormDialogsComponent } from './components/users-form-dialogs/users-form-dialogs.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';
import { userFeature } from './store/user.reducer';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [
    UsersComponent,
    UsersFormDialogsComponent,
    UsersTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([UserEffects])
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
