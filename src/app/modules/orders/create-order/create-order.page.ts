import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as fs from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';

import { UtilsService } from '@core/services/utils.service';
import { StorageService } from '@core/services/storage.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.page.html',
  styleUrls: ['./create-order.page.scss'],
})
export class CreateOrderPage implements OnInit {
  @Input() order!: string;
  form!: FormGroup;
  user!: any;
  uid!: string;
  constructor(
    private fb: FormBuilder,
    private fire: Firestore,
    private uService: UtilsService,
    private storage: StorageService,
  ) { }

  async ngOnInit() {
    this.loadForm();
    this.user = await this.storage.find('oUser');
    if (!this.order) {
      this.setCreateOrder();
    } else {
      this.uid = this.order;
    }
  }

  async onSubmit() {
    if (this.form.invalid) return;
    const { value }: any = this.form;
    await this.addItemByOrder(value);
    await this.uService.modalDimiss();
  }

  private setCreateOrder() {
    const query = fs.query(
      fs.collection(this.fire, `orders`),
      fs.where('user', '==', this.user.uid),
      fs.where('status', '==', 0),
    );
    fs.collectionData(query, { idField: 'id' })
    .subscribe(async (res: any) => {
      if (res.length === 0) {
        const create = await this.createOrder();
        this.uid = create.id;
      } else {
        this.uid = res[0].id;
      }
    });
  }

  private async addItemByOrder(data: any) {
    const document = fs.collection(this.fire, `orders/${this.uid}/product`);
    return fs.addDoc(document, data);
  }

  private async createOrder() {
    const data = {
      createdAt: fs.Timestamp.fromMillis(new Date().getTime()),
      user: this.user.uid,
      status: 0,
      total: 0,
    };
    const document = fs.collection(this.fire, `orders`);
    return fs.addDoc(document, data);
  }

  private loadForm() {
    this.form = this.fb.group({
      qtd: ['1', Validators.required],
      year: ['2021', Validators.required],
      brand: ['Focus', Validators.required],
      model: ['Ford', Validators.required],
      product: ['Test de prueba', Validators.required],
    });
  }
}
