import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const isAuthenticated = await authService.isAuthenticated();
    console.log(isAuthenticated);
    if (isAuthenticated) {
      return true;
    } else {
      router.navigate(['/auth/login']);
      return false;
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    router.navigate(['/auth/login']);
    return false;
  }
};