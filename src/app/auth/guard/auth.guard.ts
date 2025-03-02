import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true; // اجازه دسترسی به روت
      } else {
        router.navigate(['/auth/login']); // هدایت به صفحه لاگین
        return false; // عدم اجازه دسترسی
      }
    }),
    catchError((error) => {
      console.error('Error checking authentication:', error);
      router.navigate(['/auth/login']); // هدایت به صفحه لاگین در صورت خطا
      return of(false); // عدم اجازه دسترسی
    })
  );
};

