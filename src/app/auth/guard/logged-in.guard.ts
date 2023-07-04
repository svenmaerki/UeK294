import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Constants } from '../../data/constants';

export const LoggedInGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.loggedIn$.pipe(
    tap((state) => {
      if (state) {
        return true;
      }
      router.navigateByUrl(Constants.routes.unauthorized).finally();
      return false;
    })
  );
};
