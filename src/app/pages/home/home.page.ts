import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UtilsService } from '@core/services/utils.service';
import { OrdersPage } from '@module/orders/orders.page';
import { Router } from '@angular/router';
import { StorageService } from '@core/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  user: any;
  constructor(
    private router: Router,
    private uService: UtilsService,
    private storage: StorageService,
  ) {}

  ngOnInit() {}

  async ngAfterViewInit() {
    await this.getData();
  }

  async getData() {
    this.user = await this.storage.find('oUser');
  }

  onOrder() {
    this.router.navigate(['pages', 'orders']);
  }
}
