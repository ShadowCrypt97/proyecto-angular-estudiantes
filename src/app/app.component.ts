import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyecto-final-estudiantes';
  constructor(store:Store){
  }
}
