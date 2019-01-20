import { GameObject } from '../gameObject';

export class ItemBar implements GameObject {
  items: Array<any> = new Array<any>();
  update(deltaTime: number) {
  }
  draw(context: CanvasRenderingContext2D) {
    // Draw background
    const x = context.canvas.width * 0.25;
    const width = context.canvas.width * 0.5;
    const height = width * 0.25;
    const y = context.canvas.height - height - 25;
    context.fillRect(x, y, width, height);
    for (const item of this.items) {
      //Draw item
      //context.drawImage(item.img,)
    }
  }
}
