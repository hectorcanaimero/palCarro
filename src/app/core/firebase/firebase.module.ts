import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule, LANGUAGE_CODE, SETTINGS as AUTH_SETTINGS, USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireAuthModule,
    provideStorage(() => getStorage()),
    provideDatabase(() => getDatabase()),
    // provideAnalytics(() => getAnalytics()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
  ],
  providers:[
    UserTrackingService,
    ScreenTrackingService,
    { provide: LANGUAGE_CODE, useValue: 'es' },
    { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } },
  ]
})
export class FirebaseModule { }
