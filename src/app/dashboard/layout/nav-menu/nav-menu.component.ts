import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { selectAuthIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  public role$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store) {
    this.role$ = this.store.select(selectAuthIsAdmin);
  }

  logout(): void {
    this.authService.logout()
  }
}
