import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Game } from 'src/game/game';
import { GameEvent } from 'src/game/event';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit {

  @ViewChild('gameCanvas') gameCanvas: ElementRef;
  game: Game;

  ngAfterViewInit(): void {
    const context = (<HTMLCanvasElement>this.gameCanvas.nativeElement).getContext('2d');
    this.game = new Game(context);
    this.gameCanvas.nativeElement.addEventListener('mousedown', (e) => {
      console.log(this.getMousePosition(e));
      this.game.dispatch(new GameEvent('mousedown', this.getMousePosition(e)));
    }, false);

    this.gameCanvas.nativeElement.addEventListener('mouseup', (e) => {
      console.log(this.getMousePosition(e));
      this.game.dispatch(new GameEvent('mouseup', this.getMousePosition(e)));
    }, false);
  }

  getMousePosition(e: any): {x: number, y: number} {
    const rect = this.gameCanvas.nativeElement.getBoundingClientRect();
    return {x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height};
  }
}
