import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireAuthService } from '@core/firebase/fireauth.service';
import { UtilsService } from '@core/services/utils.service';
import { CreatePage } from '../create/create.page';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  message!: string;
  constructor(
    private fb: FormBuilder,
    private uService: UtilsService,
    private fireAuthService: FireAuthService,
  ) {}

  ngOnInit() {
    this.loadForm();
  }

  async onCreate() {
    await this.uService.modal({
      mode: 'ios',
      component: CreatePage,
      initialBreakpoint: .85,
      breakpoints: [0, .85]
    });
  }

  async onForgot() {
    await this.uService.modal({
      mode: 'ios',
      breakpoints: [0, .42],
      initialBreakpoint: .42,
      component: ForgotPasswordPage,
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    return this.fireAuthService.signIn(email, password);
  }

  signGoogle() {
    console.log('signGoogle');
    // this.fireAuthService.signLoginGoogle()
    // .subscribe(res => console.log(res));
  }

  private loadForm() {
    this.form = this.fb.group({
      email: ['knaimero@gmail.com', [Validators.required, Validators.email]],
      password: ['admin123', Validators.required],
    });
  }
}
