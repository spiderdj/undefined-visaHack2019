import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Game } from 'src/game/game';

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
  }
}
