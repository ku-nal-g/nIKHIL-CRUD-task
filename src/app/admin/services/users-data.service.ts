import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  baseUrl: string = "http://localhost:3000/StudentsList";

  constructor(private _http: HttpClient) { }

  getStudentsList(): Observable<any> {
    return this._http.get<any>(this.baseUrl);
  }
  deleteStudent(id: number): Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}/${id}`);
  }
  postStudent(reqObj: any) {
    return this._http.post<any>(this.baseUrl, reqObj);
  }
  updateStudent(reqObj: any, id: number) {
    return this._http.put<any>(`${this.baseUrl}/${id}`, reqObj);
  }
}
