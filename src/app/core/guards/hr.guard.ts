import { CanActivateFn, Router } from '@angular/router';

export const hrGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.role === 'HR' || user.role === 'Admin') {
    return true;
  } else {
    const router = new Router();
    router.navigate(['/dashboard']);
    return false;
  }
};
