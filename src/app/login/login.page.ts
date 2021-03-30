import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';
import { CommonService } from '../common.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

	username: string = "";
  	password: string = "";

  constructor(private router: Router,
  	private PostProvider: PostProvider,
  	private storage: Storage,
  	private cs: CommonService,
  	public alertCont: AlertController,
  	) { 

  }

  ngOnInit() {
  }


 async login() {
  	if (this.username != "" && this.username !="") {
    	await this.cs.displayLoader();
      let body ={
    		username: this.username,
    		password: this.password,
    		aski: 'login'
    	};
    	this.PostProvider.postData(body, 'file_aski.php')
      .subscribe((data) => {
        console.log(data);
        if (data.success) {
          this.cs.hideLoader();
          this.storage.set('session_storage',data.result);
          this.router.navigate(['/home']);
          this.cs.showToast('Login Successfull');
          this.username="";
          this.password="";
        } else {
          this.cs.hideLoader();
          if (data.msg!=null){
          this.cs.showToast(data.msg);
        }
          //this.cs.showToast('Connection timeout. Please try again later.!');  
        }
    	});
  	} else {
  		this.cs.showToast('Unregister account.');	
  	}
	}

gotoregister(){
 	this.router.navigate(['/register']);
	}

closeapp() {
          navigator['app'].exitApp();
}


}
