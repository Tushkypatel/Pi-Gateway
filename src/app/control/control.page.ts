import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { AlertController, Platform } from '@ionic/angular';
import { timer } from 'rxjs';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-control',
  templateUrl: 'control.page.html',
  styleUrls: ['control.page.scss'],
})
export class ControlPage implements OnInit {
  subscribe: any;
  subscriptionbutton: any;
  controls: any;
  userdata: any;
  members = {
    full_name: ''
  };

  constructor(
    private router: Router,
    private postProvider: PostProvider,
    private cs: CommonService,
    private storage: Storage,
    public alertController: AlertController,
    public platform: Platform,
    private menu: MenuController
  ) {}

  /* ionViewWillEnter(){
            const number = timer(100,3000);
            this.subscribe = number.subscribe(x => this.live());
            this.subscriptionbutton = this.platform.backButton.subscribeWithPriority(9999, () => {
                // do nothing
                  });
      }
  ionViewDidLeave()
  {
    setTimeout(() => { this.subscribe.unsubscribe(); }, 10);
  } */



  live() {
    const body = {
      aski: 'control',
      username: this.userdata.username
    };

    this.postProvider.postData(body, 'file_aski.php').subscribe((data) => {
      this.controls = data.controlvalue;
    });
  }

  ngOnInit() {
    this.storage.get('session_storage').then((res) => {
      this.userdata = res;
      this.live();
    });
  }
  controlvaluechange() {
  }

  async test(index) {
    const alert = await this.alertController.create({
      message: 'Enter value for  ' + this.controls[index].detail,
      inputs: [
        {
          placeholder: 'newvalue',
          type: 'number',
          value: this.controls[index].value
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Change',
          handler: data => {
            const body = {
              newvalue: data[0],
              newdetail: this.controls[index].address,
              aski: 'update_detail',
              username: this.userdata.username
            };
            this.postProvider.postData(body, 'file_aski.php').subscribe((data) => {
              if (data.success) {
                this.live();
              }
            });

          }
        }
      ]
    });
    alert.present();
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
