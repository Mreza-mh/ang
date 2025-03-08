import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthData } from '../../model/auth.model';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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
        password: this.signupForm.value.password,
        email: this.signupForm.value.email,
        role: 'user',
      };

      try {
        this.authService.registerUser(userData).subscribe({
          next: () => console.log('Registration successful'),
          error: (err) => console.error('Registration failed:', err),
        });
      } catch (error) {
        console.error('Registration failed:', error);
      }
    } else {
      console.log('Form is not valid');
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
