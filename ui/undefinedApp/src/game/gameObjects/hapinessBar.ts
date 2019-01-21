import { GameObject } from '../gameObject';
import { Lerp } from '../effects/lerpEffect';
import { GameEvent } from '../event';
import { Effect } from '../effects/effect';

export class HapinessBar implements GameObject{

  expandEffect: Effect;
  currentHappiness: number;
  constructor(private startHapiness: number, private totalHappiness: number) {
    this.expandEffect = new Lerp(this.lerpEffect, () => {this.expandEffect = null; }, 1);
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
    return false;
  }
}
