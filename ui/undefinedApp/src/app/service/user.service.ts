import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Pet } from '../model/pet';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUserUrl = 'http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com:5000/user/';
  private getPetUrl = 'http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com:5000/pet/';

  constructor(private http: HttpClient) { }

  getUser(userid: number): Observable<User> {
    return this.http.get<User>(this.getUserUrl + userid );
  }

  getPetForUser(userid: number): Observable<Pet> {
    return this.http.get<Pet>(this.getPetUrl+ userid );
  }

}
