import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLoading = false;
  constructor(
    private toastCtrl: ToastController,
    private loadingController: LoadingController,
    private storage: Storage
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

  async userData() {
    const a =  await this.storage.get('session_storage');
    return a;
  }

  logout() {
    this.storage.clear();
  }
}
