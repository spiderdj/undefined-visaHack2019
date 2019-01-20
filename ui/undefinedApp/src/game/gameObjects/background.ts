import { GameObject } from '../gameObject';

export class Background implements GameObject {
  constructor(private floorImg: HTMLImageElement, private wallImg: HTMLImageElement) {}
  update(deltaTime: number) {}
  draw(context: CanvasRenderingContext2D) {
    const floorPattern = context.createPattern(this.floorImg, 'repeat');
    const wallPattern = context.createPattern(this.wallImg, 'repeat');
    context.fillStyle = wallPattern;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = floorPattern;
    context.fillRect(0, context.canvas.height * 0.5, context.canvas.width, context.canvas.height * 0.5);
  }
}
