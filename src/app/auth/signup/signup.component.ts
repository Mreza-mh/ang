import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../model/auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

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

  onSubmit() {
    if (this.signupForm.valid) {
      const userData: AuthData = {
        username:this.signupForm.value.firstName +" "+ this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      };

      console.log(userData);

      this.http
        .post('https://api.realworld.io/api/users', { user: userData })
        .subscribe(
          (response) => {
            console.log('Registration successful', response);
          },
          (error) => {
            console.error('Registration failed', error);
          }
        );
    } else {
      console.log('Form is not valid');
    }
  }
}
