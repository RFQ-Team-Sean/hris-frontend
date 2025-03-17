import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user && user.role) {
    return true;
  } else {
    const router = new Router();
    router.navigate(['/login']);
    return false;
  }
};
