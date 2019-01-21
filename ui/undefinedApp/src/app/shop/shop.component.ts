import { Component, OnInit } from '@angular/core';

import { Item } from '../model/item';
import { User } from '../model/user';
import { Pet } from '../model/pet';

import { ItemService } from '../service/item.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public items : Item[];
  private addSucess: boolean = false;
  private itemBought;

  constructor(private itemService: ItemService, private userService: UserService) { }

  ngOnInit() {
    this.getItems();
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

  public user: User;
  public userid = 1;
  getUser(userid: number): void 
  {
    this.userService.getUser(userid).subscribe((user: User) => {
      console.log('Getting User');
      this.user = user;
    });
    this.getPetForUser(userid);
  }

  public pet: Pet;
  getPetForUser(userid: number): void {
    this.userService.getPetForUser(userid).subscribe((pet: Pet) => {
      console.log('Getting Pet for User');
      this.pet = pet;
      this.pet.PET_IMG_URL = 'http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com' + this.pet.PET_IMG_URL;
      console.log(this.pet);
    });
  }


}
