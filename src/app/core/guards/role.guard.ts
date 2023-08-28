import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectAuthIsAdmin } from 'src/app/store/auth/auth.selectors';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(Store).select(selectAuthIsAdmin).pipe(
    map((isAdmin) => {
      if (!isAdmin) {
        console.log(roleGuard.name + ' redirecting to Home')
        return router.createUrlTree(['/dashboard/home']);
      }
      return true
    })
  );
};
