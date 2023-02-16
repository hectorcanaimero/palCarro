import { Injectable } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})
export class MobileService {

  async initializeApp() {
    if (Capacitor.isNativePlatform()) {
      console.log('Mobile');
      await this.customStatusBar();
    } else {
      console.log('Web');
    }
  }

  async customStatusBar(): Promise<void> {
    await StatusBar.setBackgroundColor({ color: '#424242' });
  }

}
