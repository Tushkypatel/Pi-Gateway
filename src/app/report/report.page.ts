import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
  

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  
  constructor(private router: Router) { 

  }

  ngOnInit() {
  }


gotohome(){
//this.menu.close();
this.router.navigate(['/home']);

} 
}
