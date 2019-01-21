import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Game } from 'src/game/game';
import { GameEvent } from 'src/game/event';
import { ItemService } from '../service/item.service';
import { Item } from '../model/item';
import { ServiceManager } from 'src/game/serviceManager';
import { UserService } from '../service/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit {

  @ViewChild('gameCanvas') gameCanvas: ElementRef;
  game: Game;

  constructor(public itemService: ItemService, public userService: UserService) {}

  ngAfterViewInit(): void {
    this.userService.getUser(1).subscribe( (user: User) => {
    const context = (<HTMLCanvasElement>this.gameCanvas.nativeElement).getContext('2d');
    this.game = new Game(context, new ServiceManager(this), user);
    this.gameCanvas.nativeElement.addEventListener('mousedown', (e) => {
      console.log(this.getMousePosition(e));
      this.game.dispatch(new GameEvent('mousedown', this.getMousePosition(e)));
    }, false);

    this.gameCanvas.nativeElement.addEventListener('mouseup', (e) => {
      console.log(this.getMousePosition(e));
      this.game.dispatch(new GameEvent('mouseup', this.getMousePosition(e)));
    }, false);

    this.itemService.getOwnedItems().subscribe((items: Item[]) => {
      this.game.dispatch(new GameEvent('additems', items));
    });
  });
  }

  getMousePosition(e: any): {x: number, y: number} {
    const rect = this.gameCanvas.nativeElement.getBoundingClientRect();
    return {x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height};
  }
}
