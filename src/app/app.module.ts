import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { FirebaseModule } from '@core/firebase/firebase.module';
import { InitService } from '@core/services/init.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    FirebaseModule,
    AppRoutingModule,
    IonicModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppCustomLogic,
      deps: [InitService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function initializeAppCustomLogic(service: InitService): () => Promise<void> {
  return () =>
    new Promise((resolve) => {
      console.log('***process custom logic, Angular***');
      setTimeout(() => {
        console.log('***3 seconds latter, custom logic finished, Angular***');
        resolve();
      }, 3000);
    });
}
