import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordInputComponent } from '../shared/components/password-input/password-input.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { CookieService } from 'ngx-cookie-service';
import { AuthBaseComponent } from './components/auth-base/auth-base.component';


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
