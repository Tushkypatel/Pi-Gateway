import { Component, OnDestroy } from '@angular/core';
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
export class ControlPage {
  subscribe: any;
  subscriptionbutton: any;
  controls: any;
  userdata: any;
  members = {
    full_name: ''
  };


  constructor(private router: Router,
    private PostProvider: PostProvider,
    private cs: CommonService,
    private storage: Storage,
    public alertController: AlertController,
    public platform: Platform,
    private menu: MenuController
  ) {

  }


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
    let body = {
      aski: 'control',
      username: this.userdata.username
    };

    this.PostProvider.postData(body, 'file_aski.php').subscribe((data) => {
      this.controls = data.controlvalue;
      console.log(data.controlvalue);
    });
  }


  async logout() {
    //this.menu.close();
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
            this.storage.clear();
            this.router.navigate(['/login']);
            this.cs.showToast('Logout Successfull');
          }
        }
      ]
    });

    await alert.present();
  }




  ngOnInit() {
    this.storage.get('session_storage').then((res) => {
      this.userdata = res;
      this.load();
      this.live();
      console.log(res);
    });
  }


  load() {
    let body = {
      username: this.userdata.username,
      password: this.userdata.password,
      user_id: this.userdata.user_id,
      aski: 'profile'
    };

    this.PostProvider.postData(body, 'file_aski.php').subscribe((data) => {
      this.members = data.profiles;
      console.log(data.profiles);
    });
  }

  controlvaluechange() {

    console.log('Done');

  }

  async test(index) {
    let alert = await this.alertController.create({
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
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: data => {

            let body = {
              newvalue: data[0],
              newdetail: this.controls[index].address,
              aski: 'update_detail',
              username: this.userdata.username
            };
            this.PostProvider.postData(body, 'file_aski.php').subscribe((data) => {
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
