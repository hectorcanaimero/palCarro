import { Injectable } from '@angular/core';
import { AlertController, AlertOptions, LoadingController,
  LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
  ) { }

  async modal(opts: ModalOptions): Promise<void> {
    const item: HTMLIonModalElement = await this.modalCtrl.create(opts);
    await item.present();
  }

  modalDimiss(): Promise<boolean> {
    return this.modalCtrl.dismiss();
  }

  async alert(opts: AlertOptions): Promise<void> {
    const item: HTMLIonAlertElement = await this.alertCtrl.create(opts);
    await item.present();
  }

  alertDimiss(): Promise<boolean> {
    return this.alertCtrl.dismiss();
  }

  async loading(opts: LoadingOptions): Promise<void> {
    const item: HTMLIonLoadingElement = await this.loadingCtrl.create(opts);
    item.present();
  }

  loadingDimiss(): Promise<boolean> {
    return this.loadingCtrl.dismiss();
  }

  async presentToast(opts: ToastOptions): Promise<void> {
    const toast: HTMLIonToastElement = await this.toastController.create(opts);
    await toast.present();
  }
}
