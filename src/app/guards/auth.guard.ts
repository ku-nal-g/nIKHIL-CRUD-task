import { GlobalService } from 'src/app/common/services/global.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loggedinUserDetail: any = [];

  constructor(private _globalService: GlobalService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    this.loggedinUserDetail = this._globalService.getStoreValue("user_info");

    if (this.loggedinUserDetail) {
      return true;
    }
    this._router.navigate(['/login']);
    return false;
  }

}
