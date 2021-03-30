import { Component, OnDestroy } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { AlertController, Platform } from '@ionic/angular';
import { timer } from 'rxjs';
import { MenuController} from '@ionic/angular';




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
	

  constructor(private router: Router,
		    private PostProvider: PostProvider,
		    private cs: CommonService,
		    private storage: Storage,
        public alertController: AlertController,
        public platform: Platform,
        private menu: MenuController
        ){
        
   }



ionViewWillEnter(){ 
          const number = timer(1000,1000);
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
      aski: 'monitor',
      username: this.userdata.username
      };

      this.PostProvider.postData(body, 'file_aski.php').subscribe((data)=>{
          this.monitors = data.livevalue;
          console.log(data.livevalue);
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



ngOnInit(){
  	this.storage.get('session_storage').then((res)=>{
		this.userdata = res;
		this.load();
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
gotomain(){
//this.menu.close();
this.router.navigate(['/main']);

}
gotoreport(){
//this.menu.close();
this.router.navigate(['/report']);

} 
gotohome(){
//this.menu.close();
this.router.navigate(['/home']);

} 
gototablink(){
//this.menu.close();
this.router.navigate(['/tablink']);

} 

}
