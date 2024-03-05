import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCclsvD85G1Ffu7G5S6EBRqRqJHXpEmqeU",
  authDomain: "angular-firebase-app-4af7d.firebaseapp.com",
  projectId: "angular-firebase-app-4af7d",
  storageBucket: "angular-firebase-app-4af7d.appspot.com",
  messagingSenderId: "1056893175502",
  appId: "1:1056893175502:web:bafa3063380b9d43a6729f"
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth())
    ]),
  ],
};
