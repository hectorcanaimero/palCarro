import { Component, OnInit } from '@angular/core';
import * as fs from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '@core/services/utils.service';
import { CreateOrderPage } from '@module/orders/create-order/create-order.page';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {

  uid!: string | null;
  order$!: Observable<any>;
  items$!: Observable<any[]>;
  constructor(
    private fire: Firestore,
    private uService: UtilsService,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.uid = this.actRoute.snapshot.paramMap.get('uid');
    this.getData(this.uid);
  }

  getData(uid: string | null) {
    console.log(uid);
    this.getOrder(uid);
    this.getItems(uid);
  }

  async onDelete(uid: string) {
    const ref = fs.doc(this.fire, `orders/${this.uid}/product/${uid}`)
    await fs.deleteDoc(ref);
  }

  async onProduct() {
    await this.uService.modal({
      mode: 'ios',
      initialBreakpoint: .9,
      breakpoints: [0, .45, .9],
      component: CreateOrderPage,
      componentProps: { order: this.uid }
    });
  }

  onChat(): void {
    this.uService.navigateUrl(`/pages/orders/chat/${this.uid}`);
  }

  private getOrder(uid: string | null) {
    const ref = fs.doc(this.fire, `orders/${uid}`);
    this.order$ = fs.docData(ref, { idField: 'id' }) as Observable<any>;
    this.order$.subscribe(res => console.log(res));
  }

  private getItems(uid: string | null) {
    console.log(uid);
    const ref = fs.collection(this.fire, `orders/${uid}/product`);
    this.items$ = fs.collectionData(ref, { idField: 'id' }) as Observable<any>;
    this.items$.subscribe(res => console.log(res));

  }
}
