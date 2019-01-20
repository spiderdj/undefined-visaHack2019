import { GameObject } from '../gameObject';
import { Effect } from '../effects/effect';
import { Lerp } from '../effects/lerpEffect';

export class Pet implements GameObject {

  state = {
    x: 0.5,
    y: 0.5,
    w: 0.1,
    h: 0.1,
  };

  currentEffect: Effect;

  constructor(private img: HTMLImageElement) {
    this.makeJump();
  }

  makeJump = () => {
    this.currentEffect = new Lerp(this.jump, this.makeJump, 1);
  }

  update(deltaTime: number) {
    if (this.currentEffect) {
      this.currentEffect.update(deltaTime);
    }
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
    context.drawImage(this.img, 0, 0, w, h);
    context.restore();
  }

  jump = (progress: number) => {
    this.state.y = 0.5 + -Math.pow(0.25 * (progress - 0.5), 2);
  }
}
