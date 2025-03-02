import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
// import { appInitializer } from './app-init.service';
import { AngularFireAuthModule, PERSISTENCE } from '@angular/fire/compat/auth';
import { UserhomepageComponent } from './pages/home/userhomepage/userhomepage.component';

@NgModule({
  declarations: [AppComponent, UserhomepageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    CookieService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitializer,
    //   deps: [AuthService],
    //   multi: true,
    // },
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
