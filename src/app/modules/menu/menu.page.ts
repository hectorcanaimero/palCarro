import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FireAuthService } from '@core/firebase/fireauth.service';
import { MobileService } from '@core/services/mobile.service';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  version!: string;
  items = mockMenuSideData;
  constructor(
    private uService: UtilsService,
    private mobileService: MobileService,
    private fireAuthService: FireAuthService,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
    console.log(this.items);
  }

  getData() {
    this.getVersion();
  }

  onPage(url: any) {
    this.uService.navigateUrl(url);
  }

  onBack() {
    console.log('return');
    this.uService.navigateBack('/pages/home');
  }

  async signOut() {
    this.fireAuthService.signOut();
  }

  async getVersion() {
    const version = await this.mobileService.appVersion();
    if (version) {
      this.version = version;
    }
  }
}

export const mockMenuSideData = [
  {
    icon: 'person-outline',
    title: 'Perfil',
    action: '/users/profile',
  },
  {
    icon: 'notifications-outline',
    title: 'Notificaciones',
    action: '',
  },
  {
    icon: 'reader-outline',
    title: 'Ordenes',
    action: '/pages/orders',
  },
  {
    icon: 'calendar-outline',
    title: 'Historico',
    action: '',
  },
  {
    icon: 'barcode-outline',
    title: 'Rastreamento',
    action: '',
  }
]
