import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MenusModule } from '@core/widget/menus/menus.module';
import { HeaderModule } from '@core/widget/header/header.module';
import { SlidesModule } from '@core/widget/slides/slides.module';
import { BannerModule } from '@core/widget/banner/banner.module';
import { DiscoverModule } from '@core/widget/discover/discover.module';


@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    MenusModule,
    SlidesModule,
    HeaderModule,
    BannerModule,
    DiscoverModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
