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
	          this.cs.showToast('Update Successfull');

	    	});
}

gotohome(){
	this.router.navigate(['/home']);
}

}
