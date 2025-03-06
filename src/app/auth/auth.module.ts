import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthBaseComponent } from './components/auth-base/auth-base.component';
import { AuthService } from './service/auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { PasswordInputComponent } from '../shared/components/password-input/password-input.component';

import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [LoginComponent, SignupComponent, PasswordInputComponent, AuthBaseComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, CookieService],
})
export class AuthModule {}
