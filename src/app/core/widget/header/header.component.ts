import { Component, Input, OnInit } from '@angular/core';

import * as fs from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CartsPage } from '@module/carts/carts.page';
import { UtilsService } from '@core/services/utils.service';
import { StorageService } from '@core/services/storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() href: string = '';
  @Input() home: boolean = false;
  @Input() menu: boolean = true;
  @Input() snackBar: boolean = true;
  @Input() back!: string;
  total$!: Observable<any>;
  @Input() title: string = '';

  constructor(
    private fire: Firestore,
    private uService: UtilsService,
    private storage: StorageService,
  ) { }

  async ngOnInit() {
    await this.getData();
  }

  async getData() {
    const { uid } = await this.storage.find('oUser');
    const query = fs.query(
      fs.collection(this.fire, `orders`),
      fs.where('user', '==', uid),
      fs.where('status', '==', 0),
      fs.orderBy('createdAt', 'desc')
    );
    this.total$ = fs.collectionData(query, { idField: 'id' }).pipe(
      switchMap((res: any) => fs.collectionData(
        fs.collection(this.fire, `orders/${res[0].id}/product`)
      ).pipe(map((data: any) => data.length)))
    );
  }


  onGoPage(url: string) {
    this.uService.navigateFoward(url);
  }

  onGoHome(url: string) {
    this.uService.navigateUrl(url);
  }

  onGoBack(url: string) {
    console.log(url);
    this.uService.navigateBack(url);
  }

  async onGoCart() {
    await this.uService.modal({
      mode: 'ios',
      breakpoints: [0, 1],
      component: CartsPage,
      initialBreakpoint: 1,
    })
  }
}
