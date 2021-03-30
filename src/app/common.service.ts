import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLoading = false;
  constructor(
    private toastCtrl: ToastController,
    private loadingController: LoadingController
  ) { }

  async showToast(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async displayLoader() {
    if (!this.isLoading) {
      this.isLoading = true;
      return await this.loadingController.create({
      }).then(a => {
        a.present();
      });
    }
  }
  async hideLoader() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }
}
//sample