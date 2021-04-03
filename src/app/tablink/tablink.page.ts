import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { PostProvider } from '../../providers/post-provider';
import { AlertController, Platform } from '@ionic/angular';
import { CommonService } from '../common.service';
import { timer } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './tablink.page.html',
  styleUrls: ['./tablink.page.scss'],
})
export class TablinkPage implements OnInit {
  subscribe: any;
  subscriptionbutton: any;
  controls: any;
  userdata: any;
  members = {
    full_name: ''
  };
  isEditAllow = false;
  constructor(
    private router: Router,
    private postProvider: PostProvider,
    public alertController: AlertController,
    private cs: CommonService,
    public platform: Platform,
    private storage: Storage) { }


  ionViewWillEnter() {
    const no = timer(100, 1000);
    this.subscribe = no.subscribe(x => this.live());
    this.subscriptionbutton = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });

  }

  ionViewDidLeave() {
    setTimeout(() => { this.subscribe.unsubscribe(); }, 10);

  }

  live() {
    const body = {
      aski: 'dmonitor',
      username: this.userdata.username
    };

    this.postProvider.postData(body, 'file_aski.php').subscribe((data) => {
      this.controls = data.controlvalue;
      setTimeout(() => {
        this.isEditAllow = true;
      }, 1000);
    });
  }


  ngOnInit() {
    this.storage.get('session_storage').then((res) => {
      this.userdata = res;
      this.live();
    });
  }

  gotosetting() {
    this.router.navigate(['/setting']);
  }
  gotocontrol() {
    this.router.navigate(['/control']);
  }
  gotoreport() {
    this.router.navigate(['/report']);
  }
  gotohome() {
    this.router.navigate(['/home']);
  }
}
