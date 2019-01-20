import { Layer } from './layer';
import { Pet } from './gameObjects/pet';
import { Background } from './gameObjects/background';

export class Game {

  layers: Array<Layer> = new Array<Layer>();
  lastTime = new Date();

  constructor(private context: CanvasRenderingContext2D) {
    // Background Layer
    const bgLayer = new Layer();
    const wallImg = this.loadImage('../assets/wall.png');
    const floorImg = this.loadImage('../assets/floor.png');
    bgLayer.gameObjects.push(new Background(floorImg, wallImg));
    this.layers.push(bgLayer);
    // Pet layer
    const layer = new Layer();
    const petImg = this.loadImage('../assets/pet.png');
    layer.gameObjects.push(new Pet(petImg));
    this.layers.push(layer);
    requestAnimationFrame(this.loop);
  }

  loadImage(url: string): HTMLImageElement {
    const img = new Image();
    img.src = url;
    return img;
  }

  loop = () => {
    this.update();
    this.draw();
    requestAnimationFrame(this.loop);
  }

  update() {
    const newTime = new Date();
    const deltaTime = this.lastTime.getTime() - newTime.getTime();
    for (const layer of this.layers) {
      layer.update(deltaTime);
    }
  }

  draw() {
    const context = this.context;
    // Resize canvas to fit available space
    context.canvas.width = context.canvas.clientWidth;
    context.canvas.height = context.canvas.clientHeight;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    for (const layer of this.layers) {
      layer.draw(this.context);
    }
  }

}
