import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.role === 'Admin') {
    return true;
  } else {
    const router = new Router();
    router.navigate(['/dashboard']); // Redirect to dashboard if not authorized
    return false;
  }
};
