import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';
import { CommonService } from '../common.service';
import { AlertController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';


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
    public alertCont: AlertController,
    private transfer: FileTransfer,
    private file: File,
    private fileOpener: FileOpener
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
          console.log(data);
          if (data.success) {
            this.cs.hideLoader();
            this.storage.set('session_storage', data.result);
            this.router.navigate(['/home']);
            this.cs.showToast('Login Successfull');
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

  downloadExcel() {
    const url = 'http://www.africau.edu/images/default/sample.pdf';
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      alert('download complete: ' + entry.toURL());

      this.fileOpener.open(entry.toURL(), 'application/pdf')
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error opening file', e));

    }, (error) => {
      // handle error
      alert(JSON.stringify(error));
    });
  }
}
