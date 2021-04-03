import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-provider';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  data = [{
    Tower: 'A',
    Flat: '101',
    Month: 'November',
    Year: '2017'
  }, {
    Tower: 'A',
    Flat: '201',
    Month: 'November',
    Year: '2017'
  }, {
    Tower: 'B',
    Flat: '301',
    Month: 'November',
    Year: '2017'
  }, {
    Tower: 'C',
    Flat: '101',
    Month: 'November',
    Year: '2017'
  }, {
    Tower: 'D',
    Flat: '401',
    Month: 'November',
    Year: '2017'
  }];
  constructor(
    private router: Router,
    private postProvider: PostProvider,
    private transfer: FileTransfer,
    private file: File,
    private fileOpener: FileOpener
  ) {
  }

  ngOnInit() {
  }

  gotohome() {
    this.router.navigate(['/home']);
  }

  getStoragePath() {
    let file = this.file;
    return this.file.resolveDirectoryUrl(this.file.externalRootDirectory).then((directoryEntry) => {
        return file.getDirectory(directoryEntry, 'BiExportedExcel', {
            create: true,
            exclusive: false
        }).then(() => {
            return directoryEntry.nativeURL + 'BiExportedExcel/';
        });
    });
  }

  downloadExcel() {
    const sheet = XLSX.utils.json_to_sheet(this.data);
    const wb = {
      SheetNames: ['export'],
      Sheets: {
        export: sheet
      }
    };

    const wbout = XLSX.write(wb, {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary'
    });

    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        // tslint:disable-next-line: no-bitwise
        view[i] = s.charCodeAt(i) & 0xFF;
      }
      return buf;
    }

    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    this.getStoragePath().then((url) => {
      const date = new Date();
      const fileName =
          ('00' + (date.getMonth() + 1)).slice(-2)
          + '_' + ('00' + date.getDate()).slice(-2)
          + '_' + date.getFullYear() + ' '
          + ('00' + date.getHours()).slice(-2) + '_'
          + ('00' + date.getMinutes()).slice(-2) + '_'
          + ('00' + date.getSeconds()).slice(-2) + '.xlsx';

      this.file.writeFile(url, fileName , blob).then(() => {
        this.fileOpener.open(url + fileName, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        .then(() => console.log('File is opened'))
        .catch(e => console.log('Error opening file', e));
      }).catch(() => {
        alert('error creating file at :' + url);
      });
    });
  }
}
