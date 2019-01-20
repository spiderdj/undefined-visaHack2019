import { Component, OnInit } from '@angular/core';

import { Item } from '../model/item';
import { ITEMS } from '../model/mock-item';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  items = ITEMS;

  constructor() { }

  ngOnInit() {
  }

  public onBuy(item : Item): void {
    
    console.log(item.item_type_id);
  }

}
