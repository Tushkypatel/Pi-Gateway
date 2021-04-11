import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CommonService } from './common.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { MessageService } from 'src/providers/message.service';

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
    private router: Router,
    private menuCtrl: MenuController,
    private meessageService: MessageService
  ) {
    this.meessageService.getMessage()
    .subscribe(result => {
      console.log(result);
      if (result.type === 'login') {
        this.enableDisableMenu(true);
      }
    });
  }

  async ngOnInit() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
    this.userdata = await this.cs.userData();

    this.storage.get('session_storage').then((res) => {
      if (res == null) {
        this.enableDisableMenu(false);
        this.router.navigate(['/login']);
      } else {
        this.enableDisableMenu(true);
        this.router.navigate(['/home']);
      }
    });
    this.load();
  }

  enableDisableMenu(type) {
    this.menuCtrl.enable(type);
  }

  load() {
    this.cs.load(users => {
      this.members = users;
      console.log(users);
    });
  }

  async logout() {
    this.cs.logout(res => {
      if (res) {
        this.enableDisableMenu(false);
      }
    });
  }

}
