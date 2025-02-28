import { AuthService } from './auth/service/auth.service';

export function appInitializer(authService: AuthService) {
  return () =>
    new Promise<void>((resolve) => {
      authService.isAuthenticated().then((isAuth) => {
        if (isAuth) {
          console.log('User is authenticated');
        } else {
          console.log('User is not authenticated');
        }
        resolve();
      });
    });
}
