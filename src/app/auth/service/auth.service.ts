import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthData } from '../model/auth.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseUser } from '../model/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: FirebaseUser | null = null;
  authCheck = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private fireauth: AngularFireAuth,
    private cookieService: CookieService
  ) {
    this.fireauth.onAuthStateChanged((user) => {
      if (user) {
        this.user = {
          email: user.email!,
          uid: user.uid,
          username: user.displayName || '',
        };
        this.authCheck.next(true);
        if (user.refreshToken) {
          this.cookieService.set('token', user.refreshToken, {
            secure: true,
            sameSite: 'Strict',
          });
        }
      } else {
        this.user = null;
        this.authCheck.next(false);
        this.cookieService.delete('token');
      }
    });
  }

  async registerUser(authData: AuthData): Promise<void> {
    try {
      const userCredential = await this.fireauth.createUserWithEmailAndPassword(
        authData.email,
        authData.password
      );

      await userCredential.user?.updateProfile({
        displayName: authData.username,
      });

      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('error : ', error);
      throw error;
    }
  }

  async login(authData: AuthData): Promise<void> {
    try {
      const userCredential = await this.fireauth.signInWithEmailAndPassword(
        authData.email,
        authData.password
      );

      if (userCredential.user) {
        this.user = {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          username: userCredential.user.displayName || '',
        };
        if (userCredential.user.refreshToken) {
          this.cookieService.set('token', userCredential.user.refreshToken, {
            secure: true,
            sameSite: 'Strict',
          });
        }
      }
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('خطای ورود:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.fireauth.signOut();
      this.user = null;
      this.authCheck.next(false);
      this.cookieService.delete('token');
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('خطای خروج:', error);
      throw error;
    }
  }

  getCurrentUser(): FirebaseUser | null {
    return this.user ? { ...this.user } : null;
  }

  async isAuthenticated(): Promise<boolean> {
    const token = this.cookieService.get('token');
    console.log('token:', token);
    if (token) {
      return new Promise((resolve) => {
        this.fireauth.onAuthStateChanged((user) => {
          resolve(!!user);
        });
      });
    } else {
      return false
    }
  }
}
