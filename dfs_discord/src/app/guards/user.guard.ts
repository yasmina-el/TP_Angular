import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('jwt')) {
    return true;
  }

  return router.createUrlTree(['/connexion']);
};
