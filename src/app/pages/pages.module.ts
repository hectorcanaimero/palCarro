import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PagesPage } from './pages.page';
import { PagesPageRoutingModule } from './pages-routing.module';
import { HeaderModule } from '@core/widget/header/header.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    HeaderModule,
    PagesPageRoutingModule
  ],
  declarations: [PagesPage]
})
export class PagesPageModule {}
