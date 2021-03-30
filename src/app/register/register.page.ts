import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostProvider } from '../../providers/post-provider';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  full_name: string = "";
  phone_number: string = "";
  username: string = "";
  password: string = "";
  confirm_password: string = "";


  constructor(
    private router: Router,
    private PostProvider: PostProvider,
    private cs: CommonService
  ) { }

  ngOnInit() {
  }

  adduser() {
    
    if (!this.full_name) {

          this.cs.showToast('Full name required.');

        } else if (this.phone_number == "") {

          this.cs.showToast('Phone number required.');

        } else if (this.username == "") {

          this.cs.showToast('Username required.');

        } else if (this.password == "") {
          
          this.cs.showToast('password required.');

        } else if (this.password != this.confirm_password) {

          this.cs.showToast('Invalid password.');
       
        } else {
              let body = {
              full_name: this.full_name,
              phone_number: this.phone_number,
              username: this.username,
              password: this.password,
              aski: 'add_user'
              };

        this.PostProvider.postData(body, 'file_aski.php').subscribe((data) => {
        
        if (data.success) {

          this.router.navigate(['/login']);
          this.cs.showToast('Registration Successfull');

        } else {

          this.cs.showToast(data.msg);
          //this.router.navigate(['/login']);
        }
      });
    }
  }


  gotologin() {
    this.router.navigate(['/login']);   

  }

}
