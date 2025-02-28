import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../../model/auth.model';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', Validators.required],
        subscribe: [true],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value ===
      form.controls['repeatPassword'].value
      ? null
      : { mismatch: true };
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      const userData: AuthData = {
        username:
          this.signupForm.value.firstName +
          ' ' +
          this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      };

      try {
        await this.authService.registerUser(userData);
        // Optional: Show success message
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle error (show error message to user)
      }
    } else {
      console.log('Form is not valid');
    }
  }
}
