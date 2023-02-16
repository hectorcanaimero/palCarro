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
      breakpoints: [0, .35],
      initialBreakpoint: .35,
      component: ForgotPasswordPage,
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;
    const value = this.form.value;
    const user = await this.fireAuthService.signIn(value.email, value.password);
    console.log('USER', user);
  }

  signGoogle() {
    console.log('signGoogle');
    this.fireAuthService.signLoginGoogle()
    .subscribe(res => console.log(res));
  }

  private loadForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
