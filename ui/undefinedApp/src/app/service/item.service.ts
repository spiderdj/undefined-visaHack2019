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

  private getAllItemUrl = 'http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com:5000/items';
  private buyItemUrl = 'http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com:5000/buyItem';
  private getOwnedItemsUrl = 'http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com/item_type/0';
  private useItemUrl = 'http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com/useitem';

  constructor(private http: HttpClient) { }

  getOwnedItems(): Observable<Item[]> {
    return of(ITEMS);
    //return this.http.get<Item[]>(this.getOwnedItemsUrl);
  }

  useItem(userId: number, item: Item) {
    return this.http.post(this.useItemUrl, {user_id: userId, item_id: item.ITEM_TYPE_ID});
  }
  // getAllItem(): Observable<Item[]> {
  //   console.log(ITEMS);
  //   return of(ITEMS);
  // }

  getAllItem(): Observable<Item[]> {
    return this.http.get<Item[]>(this.getAllItemUrl);
  }

  buyItem(item: Item) {
   return this.http.post(this.buyItemUrl, item.ITEM_TYPE_ID, httpOptions)
  }

}
