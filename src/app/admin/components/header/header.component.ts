import { GlobalService } from './../../../common/services/global.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName!: string;
  userDetails: any = [];

  constructor(private _globalService: GlobalService, private _router: Router) { }

  ngOnInit(): void {
    this.userDetails = this._globalService.getStoreValue("user_info");
    this.userName = this.userDetails.name;
  }
  logoutUser() {
    this._globalService.clearStoreValue();
    this._globalService.showSuccessToastr("Logout Successfully!!!", "Success");
    this._router.navigate(['/login']);
  }
}
