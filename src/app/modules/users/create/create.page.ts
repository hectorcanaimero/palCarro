import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireAuthService } from '@core/firebase/fireauth.service';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private uService: UtilsService,
    private fireAuthService: FireAuthService,
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  async onSubmit() {
    if (this.form.invalid) return;
    const value = this.form.value;
    await this.uService.loading({ message: 'Loading ', duration: 300});
    this.fireAuthService.createUser(value)
  }

  private loadForm() {
    this.form = this.fb.group({
      term: ['false', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
}
