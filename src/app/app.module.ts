import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/service/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { env } from '../environments/envirenmets';
import { CookieService } from 'ngx-cookie-service';
import { appInitializer } from './app-init.service';
import { AngularFireAuthModule, PERSISTENCE } from '@angular/fire/compat/auth';
// import { NavbarComponent } from './shared/components/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(env.firebaseConfig),
  ],
  providers: [
    AuthService,
    CookieService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [AuthService],
      multi: true,
    },
  
    // { provide: PERSISTENCE, useValue: 'local' }, // اضافه شود
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
