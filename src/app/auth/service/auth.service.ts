import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { AuthData } from '../model/auth.model';
import { Router } from '@angular/router';
import { userdata } from '../model/user.model';
import { jwtDecode } from 'jwt-decode'; // درست
import { DynamicRoutesService } from 'src/app/service/dynamic-routes.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: userdata | null = null;
  authCheck = new BehaviorSubject<boolean>(false); // برای بررسی وضعیت احراز هویت کاربر
  private secretKey = 'my-very-secure-and-long-secret-key-1234567890'; // کلید مخفی ساختگی

  constructor(
    private http: HttpClient,
    private router: Router,
    private dynamicRoutesService: DynamicRoutesService
  ) {}

  private apiUrl = 'https://67c2e6bc1851890165ad9557.mockapi.io/api/user'; // Updated endpoint

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.'); // Return a user-friendly error message
  }

  // ثبت‌نام کاربر
  registerUser(authData: AuthData): Observable<any> {
    console.log('Registering user:', authData);

    return this.http.post(this.apiUrl, authData).pipe(
      tap((response: any) => {
        console.log('User registered successfully:', response);
        this.router.navigate(['/auth/login']); // Redirect to login page
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
          return user; // کاربر پیدا شد
        } else {
          throw new Error('Invalid credentials'); // کاربر پیدا نشد
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

        // هدایت کاربر به مسیر مناسب بر اساس نقش
        if (user.role === 'admin') {
          this.router.navigate(['dashboard']);
        } else {
          console
          this.router.navigate(['home']);
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    return of(null).pipe(
      tap(() => {
        this.user = null; // پاک کردن اطلاعات کاربر
        this.authCheck.next(false); // اعلام خروج کاربر
        localStorage.removeItem('token'); // حذف توکن از localStorage
        this.router.navigate(['/auth/login']);
      }),
      catchError((error) => {
        console.error('Logout failed:', error);
        // نمایش پیام خطا به کاربر (اختیاری)
        return throwError('Logout failed. Please try again.'); // ارسال خطا به caller
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
        this.user = {
          email: decoded.email,
          username: decoded.username,
          role: decoded.role,
        };
        this.authCheck.next(true); // اعلام احراز هویت موفق
        return of(true); // برگرداندن Observable از true
      } catch (error) {
        console.error('Token decoding error:', error);
        this.authCheck.next(false); // اعلام عدم احراز هویت
        return of(false); // برگرداندن Observable از false
      }
    } else {
      return of(false); // اگر توکن وجود نداشت، کاربر احراز هویت نشده است
    }
  }

  private createToken(user: userdata): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = {
      email: user.email,
      username: user.username,
      role: user.role, // اضافه کردن نقش به توکن
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
