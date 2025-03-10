import { CUSTOM_ELEMENTS_SCHEMA,APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { UserhomepageComponent } from './pages/home/userhomepage/userhomepage.component';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { appInitializer } from './app-init.service';
import { SharedModule } from './shared/shared.module';
import { LandingComponent } from './pages/landing/landing.component';
import { SwiperComponent } from './pages/landing/swiper/swiper.component';
import { register } from 'swiper/element/bundle';
import { RouterModule } from '@angular/router';

register();
@NgModule({
  declarations: [
    AppComponent,
    UserhomepageComponent,
    LandingComponent,
    SwiperComponent,
  ], //کامپوننتها، دایرکتیوها و پایپهای متعلق به ماژول.
  imports: [
    //ماژولهای خارجی مورد نیاز
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    //سرویسهایی که در ماژول قابل استفاده هستند
    AuthService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent], // کامپوننت ریشه (فقط در ماژول اصلی)
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
