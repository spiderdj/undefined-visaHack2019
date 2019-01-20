import { GameObject } from '../gameObject';

export class Pet implements GameObject {

  state = {
    x: 0.5,
    y: 0.75,
    w: 0.1,
    h: 0.1
  };

  constructor(private img: HTMLImageElement) {
  }

  update(deltaTime: number) {
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
}
