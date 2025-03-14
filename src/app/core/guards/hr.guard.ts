import { CanActivateFn } from '@angular/router';

export const hrGuard: CanActivateFn = (route, state) => {
  return true;
};
