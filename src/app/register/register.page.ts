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

  full_name = '';
  phone_number = '';
  username = '';
  password = '';
  confirm_password = '';

  constructor(
    private router: Router,
    private postProvider: PostProvider,
    private cs: CommonService
  ) { }

  ngOnInit() {
  }

  adduser() {
    if (!this.full_name) {
      this.cs.showToast('Full name required.');
    } else if (this.phone_number === '') {
      this.cs.showToast('Phone number required.');
    } else if (this.username === '') {
      this.cs.showToast('Username required.');
    } else if (this.password === '') {
      this.cs.showToast('password required.');
    } else if (this.password !== this.confirm_password) {
      this.cs.showToast('Invalid password.');
    } else {
      const body = {
        full_name: this.full_name,
        phone_number: this.phone_number,
        username: this.username,
        password: this.password,
        aski: 'add_user'
      };

      this.postProvider.postData(body, 'file_aski.php').subscribe((data) => {
        if (data.success) {
          this.router.navigate(['/login']);
          this.cs.showToast('Registration Successful');
        } else {
          this.cs.showToast(data.msg);
        }
      });
    }
  }


  gotologin() {
    this.router.navigate(['/login']);
  }
}
