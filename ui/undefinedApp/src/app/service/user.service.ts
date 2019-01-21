import { Injectable } from '@angular/core';
import { User } from '../model/user';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUserUrl = 'http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com:5000/user/';


  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.getUserUrl + id );
  }



}
