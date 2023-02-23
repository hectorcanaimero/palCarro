import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MomentModule } from 'ngx-moment';


import { OrdersPage } from './orders.page';
import { HeaderModule } from '@core/widget/header/header.module';
import { OrdersPageRoutingModule } from './orders-routing.module';
import { ViewComponent } from './view/view.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    MomentModule,
    CommonModule,
    HeaderModule,
    ReactiveFormsModule,
    OrdersPageRoutingModule,
  ],
  exports: [OrdersPage],
  declarations: [
    OrdersPage,
    ViewComponent,
    ChatComponent,
  ],
})
export class OrdersPageModule {}
