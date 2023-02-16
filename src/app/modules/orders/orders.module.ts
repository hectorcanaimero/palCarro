import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { HeaderModule } from '@core/widget/header/header.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    HeaderModule,
    ReactiveFormsModule,
    OrdersPageRoutingModule,
  ],
  exports: [OrdersPage],
  declarations: [OrdersPage],
})
export class OrdersPageModule {}
