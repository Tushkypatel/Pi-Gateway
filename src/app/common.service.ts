import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-provider';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLoading = false;
  constructor(
    private toastCtrl: ToastController,
    private loadingController: LoadingController,
    private storage: Storage,
    private alertController: AlertController,
    private router: Router,
    private postProvider: PostProvider
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

  async logout(callback?) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Do you really want to logout ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'yes',
          handler: () => {
            this.storage.clear();
            this.router.navigate(['/login']);
            this.showToast('You have successfully logged out!');
            if (callback) {
              callback(true);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async load(callback) {
    const body = await this.userData();
    if (body) {
      body.aski = 'profile';
      this.postProvider.postData(body, 'file_aski.php').subscribe((data) => {
        callback(data.profiles);
      });
    }
  }
}
