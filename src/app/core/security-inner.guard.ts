import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';

export const securityInnerGuard: CanActivateFn = (route, state) => {
  return new Promise((resolve, reject) => {
    const userService: UserService = inject(UserService);
    const router: Router = inject(Router);
    userService.getCurrentUser()
      .then(user => {
        return resolve(true);
      }, err => {
        router.navigate(['/login']);
        return resolve(false);
      });
  });
};
