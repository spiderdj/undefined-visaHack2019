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
  private userid: number;
  private money: Number;
  public user: User;

  constructor(private itemService: ItemService, private userService: UserService) { }

  ngOnInit() {
    this.userid = this.userService.getUserId();
    console.log(this.userid);
    this.getItems();
    this.getUser();
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
    this.itemService.buyItem(item, this.userid).subscribe(() => {
      console.log('Buying  item');
      this.getUser();
    });
    this.addSucess = true;
    this.itemBought = item.ITEM_TYPE_NAME;
  }

  getUser(): User
  {
    this.userService.getUser(this.userid).subscribe((user: User) => {
      console.log('Getting User');
      this.user = user;
      this.money = this.user.MONEY_AMOUNT;
      console.log(this.user);
    });
    this.getPetForUser();
    return this.user;
  }

  public pet: Pet;
  getPetForUser(): void {
    this.userService.getPetForUser(this.userid).subscribe((pet: Pet) => {
      console.log('Getting Pet for User');
      this.pet = pet;
      this.pet.PET_IMG_URL = 'http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com' + this.pet.PET_IMG_URL;
      console.log(this.pet);
    });
  }


}
