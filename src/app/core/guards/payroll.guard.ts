import { CanActivateFn } from '@angular/router';

export const payrollGuard: CanActivateFn = (route, state) => {
  return true;
};
