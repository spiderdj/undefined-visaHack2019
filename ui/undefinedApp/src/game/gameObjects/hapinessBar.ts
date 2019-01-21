import { GameObject } from '../gameObject';
import { Lerp } from '../effects/lerpEffect';
import { GameEvent } from '../event';
import { Effect } from '../effects/effect';

export class HapinessBar implements GameObject{

  expandEffect: Effect;
  currentHappiness: number;
  constructor(private startHapiness: number, private totalHappiness: number) {
  }
  update(deltaTime: number) {
    if (this.expandEffect) {
      this.expandEffect.update(deltaTime);
    }
  }
  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'black';
    context.fillRect(10, 10, 200, 32);
    context.fillStyle = 'green';
    context.fillRect(15, 15, 190 * this.currentHappiness, 22);
  }

  lerpEffect = (progress: number) => {
    this.currentHappiness = (this.totalHappiness - this.startHapiness) * progress + this.startHapiness;
  }

  processEvent(event: GameEvent): boolean {
    switch (event.type) {
      case 'sethappiness':
        this.startHapiness = this.totalHappiness;
        this.totalHappiness = Math.min(Math.max(event.payload, 0), 1);
        this.expandEffect = new Lerp(this.lerpEffect, () => {this.expandEffect = null; }, 1);
        return true;
      case 'addhappiness':
      {
        console.log(event);
        this.startHapiness = this.totalHappiness;
        this.totalHappiness = Math.min(Math.max(this.startHapiness + event.payload, 0), 1);
        this.expandEffect = new Lerp(this.lerpEffect, () => {this.expandEffect = null; }, 1);
      }
    }
    return false;
  }
}
