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
        await this.authservice.login(authData);
        // Optional: Redirect or show success message
      } catch (error) {
        console.error('Login failed:', error);
        // Handle error (show error message to user)
      }
    } else {
      console.log('Form is not valid');
    }
  }
}

