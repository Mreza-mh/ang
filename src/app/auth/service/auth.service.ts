import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

import { AuthData } from '../model/auth.model';
import { userdata } from '../model/user.model';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: userdata | null = null;
  authCheck = new BehaviorSubject<boolean>(false); 
  private secretKey = 'my-very-secure-and-long-secret-key-1234567890'; 

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  private apiUrl = 'https://67c2e6bc1851890165ad9557.mockapi.io/api/user'; 

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.'); 
  }

  // ثبت‌نام کاربر
  registerUser(authData: AuthData): Observable<any> {
    console.log('Registering user:', authData);

    return this.http.post(this.apiUrl, authData).pipe(
      tap((response: any) => {
        console.log('User registered successfully:', response);
        this.router.navigate(['/auth/login']); 
      }),
      catchError(this.handleError)
    );
  }

  login(authData: AuthData): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users: any[]) => {
        const user = users.find(
          (u) => u.email === authData.email && u.password === authData.password
        );
        if (user) {
          return user; 
        } else {
          throw new Error('Invalid credentials'); 
        }
      }),
      tap((user) => {
        this.user = {
          email: user.email,
          username: user.username,
          role: user.role,
        };
        const token = this.createToken(this.user);
        localStorage.setItem('token', token);
        this.authCheck.next(true);

        if (user.role === 'admin') {
          this.router.navigate(['dashboard']);
        } else {
          console;
          this.router.navigate(['home']);
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    return of(null).pipe(
      //یک Observable ایجاد می‌کند که فقط یک مقدار (null) منتشر می‌کند.
      tap(() => {
        this.user = null; 
        this.authCheck.next(false); 
        localStorage.removeItem('token'); 
        this.router.navigate(['/auth/login']);
      }),
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError(
          () => new Error('Something went wrong. Please try again.')
        );
      })
    );
  }

  getCurrentUser(): userdata | null {
    return this.user ? { ...this.user } : null;
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    console.log(token);

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); 
        if (decoded.exp < currentTime) {
          console.log('Token has expired');
          localStorage.removeItem('token'); 
          this.authCheck.next(false); 
          return of(false);
        }

        this.user = {
          email: decoded.email,
          username: decoded.username,
          role: decoded.role,
        };
        this.authCheck.next(true); 
        return of(true); 
      } catch (error) {
        console.error('Token decoding error:', error);
        this.authCheck.next(false); 
        return of(false); 
      }
    } else {
      return of(false); 
    }
  }

  private createToken(user: userdata): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = {
      email: user.email,
      username: user.username,
      role: user.role, 
      exp: Math.floor(Date.now() / 1000) + 3600,
    };
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = btoa(
      `${encodedHeader}.${encodedPayload}.${this.secretKey}`
    );
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
}
