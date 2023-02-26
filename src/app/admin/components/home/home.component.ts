import { GlobalService } from 'src/app/common/services/global.service';
import { HeaderComponent } from './../header/header.component';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userName!: string;

  constructor(private _globalservice: GlobalService) { }

  ngOnInit(): void {
    let userDetails = this._globalservice.getStoreValue("user_info");
    this.userName = userDetails.name;
  }

}
