import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusComponent } from './menus.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  exports: [MenusComponent],
  declarations: [MenusComponent],
  imports: [
    IonicModule,
    CommonModule,
  ]
})
export class MenusModule { }
