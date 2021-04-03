import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CommonService } from './common.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

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
    private cs: CommonService,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
    this.userdata = await this.cs.userData();

    this.storage.get('session_storage').then((res) => {
      if (res == null) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.cs.load(users => {
    });
  }

  async logout() {
    this.cs.logout();
  }

}
