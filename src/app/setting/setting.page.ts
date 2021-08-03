import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';



@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

	userdata: any;
	full_name: string;
	phone_number: string;
	new_password = '';
	confirm_new_password = '';


  constructor(private router: Router,
		    private PostProvider: PostProvider,
		    private cs: CommonService,
		    private storage: Storage) { }

  ngOnInit() {
  	this.storage.get('session_storage').then((res)=>{
		this.userdata = res;
		this.full_name = this.userdata.full_name;
		this.phone_number = this.userdata.phone_number;
	});

  }
  
selectText(event): void{
	event.target.select();
}

save(){
let body = {
		full_name: this.full_name,
		phone_number: this.phone_number,
		user_id: this.userdata.user_id,
		aski: 'update_profile'
	};
	this.PostProvider.postData(body, 'file_aski.php').subscribe((data) => {
			  this.userdata.full_name = this.full_name;
			  this.userdata.phone_number = this.phone_number;
	          this.storage.set('session_storage',this.userdata);
	          this.router.navigate(['/home']);
	          this.cs.showToast('Update Successful');

	    	});
}

gotohome(){
	this.router.navigate(['/home']);
}

changepassword() {
    if (this.new_password === '') {
      this.cs.showToast('New password required.');
    } else if (this.new_password !== this.confirm_new_password) {
      this.cs.showToast('Invalid password.');
    } else {
      const body = {
        user_id: this.userdata.user_id,
        password: this.new_password,
        aski: 'changepassword'
      };

      this.PostProvider.postData(body, 'file_aski.php').subscribe((data) => {
        if (data.success) {
          this.router.navigate(['/login']);
          this.cs.showToast('Change Password Successful');
        } else {
          this.cs.showToast(data.msg);
        }
      });
    }
  }

  toggletheme(event){
    if(event.detail.checked){
		document.body.setAttribute('color-theme','dark');
	} else{
		document.body.setAttribute('color-theme','light');
	}
  }

}
