import { Component } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { AlertController, Platform } from '@ionic/angular';
import { timer } from 'rxjs';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  subscribe: any;
  subscriptionbutton: any;
  monitors: any;
  userdata: any;
  members = {
    full_name: ''
  };

  constructor(
    private postProvider: PostProvider,
    public alertController: AlertController,
    public platform: Platform,
    private cs: CommonService
  ) {
    this.loadUserData();
  }

  async loadUserData() {
    this.userdata = await this.cs.userData();
    this.startRecordFetch();
  }

  startRecordFetch() {
    const no = timer(1000, 1000);
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
      aski: 'monitor',
      username: this.userdata.username
    };

    this.postProvider.postData(body, 'file_aski.php').subscribe((data) => {
      this.monitors = data.livevalue;
    });
  }
}
