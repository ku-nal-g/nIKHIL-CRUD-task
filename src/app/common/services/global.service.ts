import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private _storageservice: SessionStorageService, private _toastr: ToastrService, private _spinner: NgxSpinnerService) { }

  setStoreValue(key: string, value: string) {
    this._storageservice.store(key, value);
  }
  getStoreValue(key: string) {
    return this._storageservice.retrieve(key);
  }
  clearStoreValue() {
    return this._storageservice.clear();
  }
  showSuccessToastr(message: string, toastrType?: string) {
    toastrType?.length ? this._toastr.success(message, toastrType) : this._toastr.success(message);
  }
  showErrorToastr(message: string, toastrType?: string) {
    toastrType?.length ? this._toastr.error(message, toastrType) : this._toastr.error(message);
  }
  showLoader() {
    this._spinner.show();
  }
  hideLoader() {
    this._spinner.hide();
  }
}
