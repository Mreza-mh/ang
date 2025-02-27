import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordInputComponent } from '../shared/components/password-input/password-input.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [LoginComponent, SignupComponent, PasswordInputComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule , ReactiveFormsModule , HttpClientModule],
})
export class AuthModule {}
