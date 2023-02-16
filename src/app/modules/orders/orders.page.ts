import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '@core/services/utils.service';
import { CreateOrderPage } from '../create-order/create-order.page';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private uService: UtilsService,
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  onSubmit() {
    if (this.form.invalid) return;
    console.log(this.form.value);
  }

  async onAdd() {
    await this.uService.modal({
      mode: 'ios',
      initialBreakpoint: .8,
      component: CreateOrderPage,
      breakpoints: [0, .4, .8],
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
