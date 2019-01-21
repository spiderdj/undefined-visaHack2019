import { GameObject } from '../gameObject';
import { GameEvent } from '../event';

export class ItemObject implements GameObject {

  state = {
    x: 0.5,
    y: 0.5,
    w: 0.1,
    h: 0.1,
  };

  constructor(x: number, y: number, private img: HTMLImageElement) {
    this.state.x = x;
    this.state.y = y;
  }
  processEvent(event: GameEvent): boolean {
    return false;
  }  update(deltaTime: number) {
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
}
