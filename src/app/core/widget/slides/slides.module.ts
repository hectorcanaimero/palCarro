import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides.component';



@NgModule({
  exports: [SlidesComponent],
  declarations: [SlidesComponent],
  imports: [
    IonicModule,
    CommonModule,
    SwiperModule,
  ]
})
export class SlidesModule { }
