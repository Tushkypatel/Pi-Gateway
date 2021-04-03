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

  username = '';
  password = '';

  constructor(
    private router: Router,
    private postProvider: PostProvider,
    private storage: Storage,
    private cs: CommonService,
    public alertCont: AlertController
  ) {}

  ngOnInit() {
  }

  async login() {
    if (this.username !== '' && this.username !== '') {
      await this.cs.displayLoader();
      const body = {
        username: this.username,
        password: this.password,
        aski: 'login'
      };
      this.postProvider.postData(body, 'file_aski.php')
        .subscribe((data) => {
          if (data.success) {
            this.cs.hideLoader();
            this.storage.set('session_storage', data.result);
            this.router.navigate(['/home']);
            this.cs.showToast('Login Successful');
            this.username = '';
            this.password = '';
          } else {
            this.cs.hideLoader();
            if (data.msg != null) {
              this.cs.showToast(data.msg);
            }
            // this.cs.showToast('Connection timeout. Please try again later.!');
          }
        });
    } else {
      this.cs.showToast('Unregister account.');
    }
  }

  gotoregister() {
    this.router.navigate(['/register']);
  }

  closeapp() {
    // tslint:disable-next-line: no-string-literal
    navigator['app'].exitApp();
  }
}
