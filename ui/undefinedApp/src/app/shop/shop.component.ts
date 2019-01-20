import { Component, OnInit } from '@angular/core';

import { Item } from '../model/item';
import { ITEMS } from '../model/mock-item';

import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public items : Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() :void {
      this.itemService.getAllItem()
          .subscribe(allItems => this.items = allItems);
  }

  public onBuy(item : Item): void {
    console.log(item.item_type_id);
    // this.itemService.buyItem(item)
    //myb send toastr notif
    console.log('Item bought');
  }

}
