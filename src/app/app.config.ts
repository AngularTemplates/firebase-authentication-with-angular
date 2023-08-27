import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FirebaseOptions } from 'firebase/app';
import { AngularFireModule } from '@angular/fire/compat';
import { UserService } from './core/user.service';

export const firebaseConfig: FirebaseOptions = {
  apiKey: "YOUR_CREDENTIALS_HERE",
  authDomain: "YOUR_CREDENTIALS_HERE",
  projectId: "YOUR_CREDENTIALS_HERE",
  storageBucket: "YOUR_CREDENTIALS_HERE",
  messagingSenderId: "YOUR_CREDENTIALS_HERE",
  appId: "YOUR_CREDENTIALS_HERE",
  measurementId: "YOUR_CREDENTIALS_HERE"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig)),
    UserService
   ]
};
