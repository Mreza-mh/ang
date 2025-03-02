import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { AuthData } from '../../model/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authData: AuthData = { email: ' ', password: '' };
  password: string = '';

  constructor(private authservice: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const authData: AuthData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      try {
        this.authservice.login(authData).subscribe({
          next: (response) => {
            console.log('Login successful:', response);
            // انجام اقدامات بعدی پس از لاگین موفق (مثلاً هدایت به صفحه داشبورد)
          },
          error: (err) => {
            console.error('Login failed:', err);
            // نمایش پیام خطا به کاربر
          },
        });
      } catch (error) {
        console.error('An unexpected error occurred:', error);
        // نمایش پیام خطا به کاربر
      }
    } else {
      console.log('Form is not valid');
      // نمایش پیام خطا به کاربر (مثلاً "لطفاً فیلدهای فرم را پر کنید")
    }
  }
}

