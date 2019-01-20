import { Component, OnInit } from '@angular/core';

import { Item } from '../model/item';

import { ItemService } from '../service/item.service';

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
    console.log(this.stuffs);
  }

  closeAlert() {
    this.addSucess = false;
  }

  getItems() :void {
      this.itemService.getAllItem().subscribe((items:Item[]) => {
        this.items = items;
        for( let item of this.items ){
          item.ITEM_IMG_URL = 'http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com' + item.ITEM_IMG_URL;
        }
        console.log(items);
      })

  }

  public onBuy(item : Item): void {
    this.itemService.buyItem(item).subscribe(() => {
      console.log('Buying  item');
    });
    this.addSucess = true;
    this.itemBought = item.ITEM_TYPE_NAME;
  }


}
