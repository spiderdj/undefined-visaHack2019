import { GameObject } from '../gameObject';
import { GameEvent } from '../event';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/service/item.service';
import { ServiceManager } from '../serviceManager';

export class ItemBar implements GameObject {
  items: Array<any> = new Array<any>();
  constructor(serviceManager: ServiceManager) {
  }

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
    this.items.forEach( (item: Item, index: number) => {
      // Draw item
      context.fillStyle = 'white';
      context.fillRect(x + (width / 5) * index, y, width / 5, height);
    });
  }

  processEvent(event: GameEvent): boolean {
    switch (event.type) {
      case 'mouseup':
        if (event.payload.x > 0.25 && event.payload.x < 0.75) {
          if (event.payload.y > 0.75 && event.payload.y < 1) {
            const index = Math.floor((event.payload.x - 0.25) / 0.1);
            return true;
          }
        }
      break;
      case 'additems':
        this.items = event.payload;
        return true;
  }
    return false;
  }
}
