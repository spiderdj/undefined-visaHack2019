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
  private getOwnedItemsUrl = 'http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com:5000/item_type/1';
  private useItemUrl = 'http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com:5000/useitem';

  constructor(private http: HttpClient) { }

  getAllItem(): Observable<Item[]> {
    console.log(ITEMS);
    return of(ITEMS);
  }

  getOwnedItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.getOwnedItemsUrl);
  }

  useItem(userId: number, item: Item) {
    return this.http.post(this.useItemUrl, {user_id: userId, item_type_id: item.item_type_id});
  }
  // getAllItem(): Observable<Item[]> {
  //     //return this.http.get<Item[]>(this.getAllItemUrl)
  // }

  buyItem(item: Item) {
   // return this.http.post(this.buyItemUrl, item.item_type_id, httpOptions)
  }

}
