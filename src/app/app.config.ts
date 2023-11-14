import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FirebaseOptions } from 'firebase/app';
import { AngularFireModule } from '@angular/fire/compat';
import { UserService } from './core/user.service';

export const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyARlbwlPRHTw3u1hcZVMcJulYGq-ly1x5U",

  authDomain: "testproject-4d8cc.firebaseapp.com",

  projectId: "testproject-4d8cc",

  storageBucket: "testproject-4d8cc.appspot.com",

  messagingSenderId: "35615834005",

  appId: "1:35615834005:web:9d3eb4f35c24465361009c",

  measurementId: "G-XC6X8J7763"

};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig)),
    UserService
   ]
};
