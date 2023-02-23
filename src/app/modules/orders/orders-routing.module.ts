import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersPage } from './orders.page';
import { ViewComponent } from './view/view.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersPage
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@module/orders/create-order/create-order.module').then(m => m.CreateOrderPageModule)
  },
  {
    path: 'view/:uid',
    component: ViewComponent
  },
  {
    path: 'chat/:uid',
    component: ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule {}
