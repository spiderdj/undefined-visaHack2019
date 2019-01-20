import { GameObject } from '../gameObject';
import { GameEvent } from '../event';

export class ItemBar implements GameObject {
  items: Array<any> = new Array<any>();
  update(deltaTime: number) {
  }
  draw(context: CanvasRenderingContext2D) {
    // Draw background
    const x = context.canvas.width * 0.25;
    const width = context.canvas.width * 0.5;
    const height = width * 0.25;
    const y = context.canvas.height - height;
    context.fillStyle = 'black';
    context.fillRect(x, y, width, height);
    for (const item of this.items) {
      //Draw item
      //context.drawImage(item.img,)
    }
  }

  processEvent(event: GameEvent): boolean {
    switch (event.type) {
      case 'mouseup':
        if (event.payload.x > 0.25 && event.payload.x < 0.75) {
          if (event.payload.y > 0.75 && event.payload.y < 1) {
            return true;
          }
        }
      break;
      case 'addevents':
        this.items = event.payload;
        return true;
  }
    return false;
  }
}
