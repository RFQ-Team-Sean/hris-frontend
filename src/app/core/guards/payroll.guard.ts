import { CanActivateFn, Router } from '@angular/router';

export const payrollGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.role === 'Payroll_Manager' || user.role === 'Admin') {
    return true;
  } else {
    const router = new Router();
    router.navigate(['/dashboard']);
    return false;
  }
};
