import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-provider';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  members = {
    full_name: ''
  };
  userdata: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private postProvider: PostProvider,
    private cs: CommonService,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.userdata = await this.cs.userData();
  }

  ngOnInit() {

  }

  load() {
    const body = {
      username: this.userdata.username,
      password: this.userdata.password,
      user_id: this.userdata.user_id,
      aski: 'profile'
    };

    this.postProvider.postData(body, 'file_aski.php').subscribe((data) => {
      this.members = data.profiles;
      console.log(data.profiles);
    });
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Do you really want to logout ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'yes',
          handler: () => {
            this.cs.logout();
            this.router.navigate(['/login']);
            this.cs.showToast('Logout Successful');
          }
        }
      ]
    });
    await alert.present();
  }
}
