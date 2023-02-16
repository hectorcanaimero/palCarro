import { Component } from '@angular/core';
import { UtilsService } from '@core/services/utils.service';
import { OrdersPage } from '@module/orders/orders.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router,
    private uService: UtilsService,
  ) {}

  onOrder() {
    this.router.navigate(['pages', 'orders']);
  }
}
