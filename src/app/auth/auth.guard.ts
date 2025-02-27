import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // تزریق AuthService
  const router = inject(Router); // تزریق Router

  if (authService.isAuth()) {
    return true; // اگر کاربر وارد شده باشد، اجازه دسترسی بده
  } else {
    router.navigate(['/login']); // اگر کاربر وارد نشده باشد، به صفحه لاگین هدایت کن
    return false; // اجازه دسترسی نده
  }
};
