import { GameObject } from '../gameObject';
import { GameEvent } from '../event';
import { User } from 'src/app/model/user';
import { Layer } from '../layer';
import { Game } from '../game';
import { ServiceManager } from '../serviceManager';

export class AwardPopup implements GameObject {
  constructor(private user: User, private happiness: number, private layer: Layer, private game: Game,
     private serviceManager: ServiceManager) {
  }
  processEvent(event: GameEvent): boolean {
    switch (event.type) {
      case 'mouseup':
        this.layer.gameObjects = this.layer.gameObjects.filter(obj => obj !== this);
        console.log(this.happiness);
        this.game.dispatch(new GameEvent('addhappiness', this.happiness / 100));
        this.serviceManager.resetRewards();
        return true;
    }
    return false;
  }
  update(deltaTime: number) {
  }
  draw(context: CanvasRenderingContext2D) {
    const x = 0.125 * context.canvas.width;
    const y = 0.05 * context.canvas.height;
    const w = 0.75 * context.canvas.width;
    const h = 0.9 * context.canvas.height;

    context.fillStyle = 'white';
    context.fillRect(x, y, w, h);
    context.fillStyle = '#f7882f';
    context.font = '30px Arial';
    context.fillText('Your Weekly Report',x + w/2 - 120, y + h * 0.075);
    context.fillText('Happiness',x + w/2 - 75,y+h*0.25);
    context.fillText('Coins',x + w/2 - 45,y+h*0.5);

    context.fillStyle = this.happiness <= 0 ? 'red' : 'green';
    context.fillText((this.happiness||0).toString() ,x + w/2,y+h*0.35);

    context.fillStyle = this.user.MONEY_TO_AWARD <= 0 ? 'red' : 'green';
    context.fillText((this.user.MONEY_TO_AWARD||0).toString() ,x + w/2,y+h*0.6);


  }
}
