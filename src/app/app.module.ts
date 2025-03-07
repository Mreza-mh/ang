import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { UserhomepageComponent } from './pages/home/userhomepage/userhomepage.component';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { appInitializer } from './app-init.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, UserhomepageComponent], //کامپوننتها، دایرکتیوها و پایپهای متعلق به ماژول.
  imports: [
    //ماژولهای خارجی مورد نیاز
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
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
})
export class AppModule {}
