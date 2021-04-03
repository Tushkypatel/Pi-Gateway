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
  constructor(
    private router: Router,
    private postProvider: PostProvider,
    public alertController: AlertController,
    private cs: CommonService,
    private storage: Storage) { }
  live() {
    const body = {
      aski: 'dcontrol',
      username: this.userdata.username
    };

    this.postProvider.postData(body, 'file_aski.php').subscribe((data) => {
      this.controls = data.controlvalue;
      setTimeout(() => {
        this.isEditAllow = true;
      }, 1000);
    });
  }

  ngOnInit() {
    this.storage.get('session_storage').then((res) => {
      this.userdata = res;
      this.load();
      this.live();
    });
  }


  load() {
    this.cs.load(members => {
      this.members = members;
    });
  }

  test(index) {
    const body = {
      newvalue: this.controls[index].value,
      newdetail: this.controls[index].address,
      aski: 'update_ddetail',
      username: this.userdata.username
    };
    this.postProvider.postData(body, 'file_aski.php').subscribe((data) => {
      if (data.success) {
        this.cs.showToast(this.controls[index].detail + ' status update successfully');
      }
    });
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
