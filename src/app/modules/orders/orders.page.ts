import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as fs from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { UtilsService } from '@core/services/utils.service';
import { CreateOrderPage } from './create-order/create-order.page';
import { StorageService } from '@core/services/storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  items$!: Observable<any[]>;
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private fire: Firestore,
    private uService: UtilsService,
    private storage: StorageService,
  ) { }

  async ngOnInit() {
    this.loadForm();
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
    this.items$ = fs.collectionData(query, { idField: 'id' })
    this.items$.subscribe(res => console.log(res));
  }

  onSubmit() {
    if (this.form.invalid) return;
    console.log(this.form.value);
  }

  async openItem() {
    await this.uService.modal({
      mode: 'ios',
      initialBreakpoint: .9,
      component: CreateOrderPage,
      breakpoints: [0, .45, .9],
    });
  }

  private loadForm() {
    this.form = this.fb.group({
      year: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      product: ['', Validators.required],
      qtd: ['', Validators.required]
    });
  }
}
