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

  onSubmit() {
    if (this.form.invalid) return;
    return this.fireAuthService.forgotPassword(this.form.value.email);
  }

  private loadForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
