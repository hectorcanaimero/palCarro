import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
  imports: [
    IonicModule,
    CommonModule,
  ],
})
export class HeaderModule { }
