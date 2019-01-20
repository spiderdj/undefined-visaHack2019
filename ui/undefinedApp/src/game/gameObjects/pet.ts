import { GameObject } from '../gameObject';
import { Effect } from '../effects/effect';
import { Lerp } from '../effects/lerpEffect';
import { GameEvent } from '../event';

export class Pet implements GameObject {

  state = {
    x: 0.5,
    y: 0.5,
    w: 0.1,
    h: 0.1,
  };

  currentEffects: Array<Effect> = new Array<Effect>();

  constructor(private img: HTMLImageElement) {
    this.repeatJump();
    this.moveTo(0.95);
  }

  repeatJump = () => {
    this.makeJump(this.repeatJump);
  }

  makeJump = (callback?: Function) => {
    this.currentEffects.push(new Lerp(this.jump, (effect) => {this.removeEffect(effect); if (callback) { callback(); } }, 1));
  }

  update(deltaTime: number) {
      this.currentEffects.forEach((effect) => effect.update(deltaTime));
  }

  processEvent(event: GameEvent): boolean {
    console.log(event);
    switch (event.type) {
      case 'mouseup':
      this.moveTo(event.payload.x);
      return true;
    }
    return false;
  }

  draw(context: CanvasRenderingContext2D) {
    // Transform state from world to screen
    const x = this.state.x * context.canvas.width;
    const y = this.state.y * context.canvas.height;
    let w = this.state.w * context.canvas.width;
    let h = this.state.h * context.canvas.height;

    if (w > h) {
      h = w;
    } else {
      w = h;
    }
    context.save();
    context.translate(x, y);
    context.drawImage(this.img, -w / 2, -h / 2, w, h);
    context.restore();
  }

  jump = (progress: number) => {
    this.state.y = 0.5 + -Math.pow(0.25 * (progress - 0.5), 2);
  }

  removeEffect = (effect: Effect) => {
    this.currentEffects = this.currentEffects.filter((e: Effect) => e !== effect);
  }

  moveTo(position: number, callback?: Function) {
    const startPos = this.state.x;
    const moveToAnim = (progress: number) => {
      this.state.x = (position - startPos) * progress + startPos;
    };
    const duration = Math.abs(position - startPos) / 0.39;
    this.currentEffects.push(new Lerp(moveToAnim, (effect) => {
      this.removeEffect(effect);
      if (callback) {
        callback();
      }
    }, duration));
  }
}
