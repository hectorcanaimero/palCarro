import { Component, OnInit } from '@angular/core';
import { MobileService } from '@core/services/mobile.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  version!: string;

  constructor(
    private mobileService: MobileService,
  ) { }

  ngOnInit() {
  }

  getData() {
    this.getVersion();
  }

  async getVersion() {
    const version = await this.mobileService.appVersion();
    if (version) {
      this.version = version;
    }
  }
}
