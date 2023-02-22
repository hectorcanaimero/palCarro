import { Component, OnInit } from '@angular/core';
import { InitService } from '@core/services/init.service';
import { MobileService } from './core/services/mobile.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private iService: InitService,
    private mobileService: MobileService,
  ) {}

  async ngOnInit() {
    await this.mobileService.initializeApp();
    this.iService.initApp();
  }
}
