import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { PostProvider } from '../../providers/post-provider';
import { AlertController, Platform } from '@ionic/angular';
import { CommonService } from '../common.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
	controls: any;
	userdata: any;
		members = {
		full_name: ''
	};
  isEditAllow = false;
  constructor(private router: Router,
		    private PostProvider: PostProvider,public alertController: AlertController,
		    private cs: CommonService,
		    private storage: Storage,) { }


live(){
      let body = {
      aski: 'dcontrol',
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

test(index) { 
    let body = {
    newvalue: this.controls[index].value,
    newdetail: this.controls[index].address,
    aski: 'update_ddetail',
    username: this.userdata.username
    };
        this.PostProvider.postData(body, 'file_aski.php').subscribe((data) => {
           if (data.success) {
            this.cs.showToast(this.controls[index].detail + ' status update successfully');
           }
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
