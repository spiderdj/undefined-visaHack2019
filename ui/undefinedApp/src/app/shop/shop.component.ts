import { Component, OnInit } from '@angular/core';

import { Item } from '../model/item';
import { ITEMS } from '../model/mock-item';

import { ItemService } from '../service/item.service';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public items : Item[];
  private addSucess: boolean = false;
  private itemBought;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItems();
  }

  closeAlert() {
    this.addSucess = false;
  }

  getItems() :void {
      this.itemService.getAllItem()
          .subscribe(allItems => this.items = allItems);
  }

  public onBuy(item : Item): void {
    this.itemService.buyItem(item)
    this.addSucess = true;
    this.itemBought = item.name;
  }


}
