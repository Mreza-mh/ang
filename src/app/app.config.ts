import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { AppRoutingModule, routes } from './app-routing.module'; // Import routes

export const firebaseConfig = {
  apiKey: 'AIzaSyADtUCHCmeWgLoZ1DkC_b3jPNuX_q8WLd0',
  authDomain: 'ngts-1111.firebaseapp.com',
  projectId: 'ngts-1111',
  storageBucket: 'ngts-1111.firebasestorage.app',
  messagingSenderId: '630249038156',
  appId: '1:630249038156:web:a8200854878597ebf66fe9',
  measurementId: 'G-Z8SSXPN9MG',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Pass routes instead of AppRoutingModule
    provideHttpClient,
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
    ]),
  ],
};
