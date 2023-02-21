import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.page.html',
  styleUrls: ['./create-order.page.scss'],
})
export class CreateOrderPage implements OnInit {
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

  private loadForm() {
    this.form = this.fb.group({
      year: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      product: ['', Validators.required],
    });
  }
}
