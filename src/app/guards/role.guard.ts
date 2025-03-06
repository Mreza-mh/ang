import { Injectable, inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> => {
    const requiredRole = route.data['role']; 

    return this.authService.isAuthenticated().pipe(
      map((isAuthenticated) => {
        const user = this.authService.getCurrentUser();

        if (isAuthenticated && user && user?.role === requiredRole) {
          return true; 
        } else {
          return this.router.createUrlTree(['/auth/login']);
        }
      }),
      catchError(() => {
        return of(this.router.createUrlTree(['/auth/login'])); 
      })
    );
  };
}

export const roleGuardFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const guard = inject(RoleGuard);
  return guard.canActivate(route, state);
};
