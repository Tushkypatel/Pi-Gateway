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
  constructor(private router: Router,
        private PostProvider: PostProvider,public alertController: AlertController,
        private cs: CommonService,
        public platform: Platform,
        private storage: Storage,) { }


ionViewWillEnter(){ 
          const number = timer(100,1000);
          this.subscribe = number.subscribe(x => this.live());
          this.subscriptionbutton = this.platform.backButton.subscribeWithPriority(9999, () => {
              // do nothing
                });

    } 

ionViewDidLeave()
{
  setTimeout(() => { this.subscribe.unsubscribe(); }, 10);
       
}  




live(){
      let body = {
      aski: 'dmonitor',
      username: this.userdata.username
      };

      this.PostProvider.postData(body, 'file_aski.php').subscribe((data)=>{
          this.controls = data.controlvalue;
          setTimeout(() => {
            this.isEditAllow = true;
          }, 1000);
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
          this.router.navigate(['/login'], {replaceUrl: true});
          this.cs.showToast('Logout Successful');
      }
    }
  ]
});

    await alert.present();
  }




ngOnInit(){
   this.storage.get('session_storage').then((res)=>{
    this.userdata = res;
    this.load();
    this.live();
    console.log(res);
  });
}


load(){
      let body = {
      username: this.userdata.username,
      password: this.userdata.password,
      user_id: this.userdata.user_id,
      aski: 'profile'
      };

      this.PostProvider.postData(body, 'file_aski.php').subscribe((data)=>{
          this.members = data.profiles;
          console.log(data.profiles);
      });
  } 

      



gotosetting(){
//this.menu.close();  
this.router.navigate(['/setting']);

}
gotocontrol(){
//this.menu.close();
this.router.navigate(['/control']);

}
  
gotoreport(){
//this.menu.close();
this.router.navigate(['/report']);

} 
gotohome(){
//this.menu.close();
this.router.navigate(['/home']);

} 
}
