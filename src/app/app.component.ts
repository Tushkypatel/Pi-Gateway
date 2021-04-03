import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
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
    private postProvider: PostProvider,
    private cs: CommonService
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
