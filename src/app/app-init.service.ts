import { AuthService } from './auth/service/auth.service';

export function appInitializer(authService: AuthService) {
  return () => authService.isAuthenticated();

}