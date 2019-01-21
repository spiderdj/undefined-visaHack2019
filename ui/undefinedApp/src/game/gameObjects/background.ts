import { GameObject } from '../gameObject';
import { GameEvent } from '../event';

export class Background implements GameObject {
  constructor(private floorImg: HTMLImageElement, private wallImg: HTMLImageElement, private logo: HTMLImageElement) {}
  update(deltaTime: number) {}
  draw(context: CanvasRenderingContext2D) {
    const floorPattern = context.createPattern(this.floorImg, 'repeat');
    const wallPattern = context.createPattern(this.wallImg, 'repeat');
    context.fillStyle = wallPattern;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = floorPattern;
    context.fillRect(0, context.canvas.height * 0.5, context.canvas.width, context.canvas.height * 0.5);
    const logoAspect = this.logo.width / this.logo.height;
    const logoWidth = context.canvas.width * 0.1;
    const logoHeight = logoWidth / logoAspect;
    //context.drawImage(this.logo, context.canvas.width*0.65,context.canvas.height*0.25, logoWidth,logoHeight);
  }

  processEvent(event: GameEvent): boolean {
    return false;
  }
}
