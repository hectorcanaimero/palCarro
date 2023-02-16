import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FireAuthService } from '@core/firebase/fireauth.service';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private uService: UtilsService,
    private fireAuthService: FireAuthService,
  ) {}

  ngOnInit() {
    this.loadForm();
  }

  async onSubmit() {
    await this.uService.loading({ message: 'Loading', duration: 1000 });
    this.uService.modalDimiss();
  }

  private loadForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
