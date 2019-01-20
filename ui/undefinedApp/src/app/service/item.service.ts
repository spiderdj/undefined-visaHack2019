import { Injectable } from '@angular/core';

import { Item } from '../model/item';
import { ITEMS } from '../model/mock-item';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private getAllItemUrl = '';
  private buyItemUrl = 'api/buyItem';

  constructor(private http: HttpClient) { }

  getAllItem(): Observable<Item[]> {
    console.log(ITEMS);
    return of(ITEMS);
  }

  // getAllItem(): Observable<Item[]> {
  //     //return this.http.get<Item[]>(this.getAllItemUrl)
  // }

  buyItem(item: Item) {
   // return this.http.post(this.buyItemUrl, item.item_type_id, httpOptions)
  }

}
