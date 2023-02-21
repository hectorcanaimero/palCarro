import { BannerComponent } from './banner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';



@NgModule({
  exports: [BannerComponent],
  declarations: [BannerComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class BannerModule { }
