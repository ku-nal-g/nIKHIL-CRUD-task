import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = "http://localhost:3000/Users";

  constructor(private _http: HttpClient) { }

  getRegisteredUsers(): Observable<any> {
    return this._http.get(this.baseUrl);
  }
}
