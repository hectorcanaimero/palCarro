import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

import { DiscoverComponent } from './discover.component';


@NgModule({
  exports: [DiscoverComponent],
  declarations: [DiscoverComponent],
  imports: [
    IonicModule,
    CommonModule,
    SwiperModule,
  ]
})
export class DiscoverModule { }
