import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const requiredRole = route.data['role']; // نقش مورد نیاز برای دسترسی به مسیر

    return this.authService.isAuthenticated().pipe(
      map((isAuthenticated) => {
        const user = this.authService.getCurrentUser();

        if (isAuthenticated && user?.role === requiredRole) {
          return true; // اجازه دسترسی
        } else {
          this.router.navigate(['/auth/login']); // هدایت به صفحه لاگین
          return false; // عدم اجازه دسترسی
        }
      })
    );
  }
}
