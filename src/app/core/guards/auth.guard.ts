import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  if (user) {
    return true; // User is logged in
  } else {
    const router = new Router();
    router.navigate(['/login']); // Redirect to login page if not authenticated
    return false;
  }
};
