import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FireAuthService } from '@core/firebase/fireauth.service';
import { MobileService } from '@core/services/mobile.service';
import { UtilsService } from '@core/services/utils.service';
import * as fs from '@angular/fire/firestore';
import { Firestore } from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  logo: string = 'https://firebasestorage.googleapis.com/v0/b/palcarro-c7561.appspot.com/o/apps%2Flogo.png?alt=media&token=ed915b70-4910-4145-ba23-2074874bdfdc';
  version!: string;
  items$!: Observable<any[]>;
  constructor(
    private uService: UtilsService,
    private mobileService: MobileService,
    private fireAuthService: FireAuthService,
    private fire: Firestore,
  ) { }

  ngOnInit() {
    this.getVersion();
    this.getData();
  }

  getData(type: number = 0) {
    const query = fs.query(
      fs.collection(this.fire, `menus`),
      fs.where('type', '==', type),
      fs.orderBy('order')
    );
    this.items$ = fs.collectionData(query, { idField: 'id' }) as Observable<any[]>;
  }

  onPage(url: any) {
    this.uService.navigateUrl(url);
  }

  onBack() {
    console.log('return');
    this.uService.navigateBack('/pages/home');
  }

  async signOut() {
    this.fireAuthService.signOut();
  }

  async getVersion() {
    const version = await this.mobileService.appVersion();
    if (version) {
      this.version = version;
    }
  }
}
