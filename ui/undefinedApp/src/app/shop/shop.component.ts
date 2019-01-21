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
<<<<<<< HEAD
=======
  private userid: number;
  private money: Number;
  public user: User;
>>>>>>> 5b0c28f9d816940d916741761044d7f093d2fd92

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

<<<<<<< HEAD
  public userid = 1;
  public onBuy(item : Item, userid: number): void {
    this.itemService.buyItem(item, userid).subscribe(() => {
=======
  public onBuy(item : Item): void {
    this.itemService.buyItem(item, this.userid).subscribe(() => {
>>>>>>> 5b0c28f9d816940d916741761044d7f093d2fd92
      console.log('Buying  item');
    });
    this.addSucess = true;
    this.itemBought = item.ITEM_TYPE_NAME;
  }

  public user: User;
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
