import { Layer } from './layer';
import { Pet } from './gameObjects/pet';
import { Background } from './gameObjects/background';
import { HapinessBar } from './gameObjects/hapinessBar';
import { ItemBar } from './gameObjects/itemBar';
import { GameEvent } from './event';
import { ServiceManager } from './serviceManager';
import { Item } from 'src/app/model/item';

export class Game {

  eventsQueue: Array<GameEvent> = new Array<GameEvent>();
  layers: Array<Layer> = new Array<Layer>();
  lastTime = new Date();

  constructor(private context: CanvasRenderingContext2D, private serviceManager: ServiceManager) {
    // Background Layer
    const bgLayer = new Layer();
    const wallImg = this.loadImage('../assets/wall.png');
    const floorImg = this.loadImage('../assets/floor.png');
    bgLayer.gameObjects.push(new Background(floorImg, wallImg));
    this.layers.push(bgLayer);
    // Pet layer
    const layer = new Layer();
    const petImg = this.loadImage('http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com/images/walrus.png');
    layer.gameObjects.push(new Pet(petImg));
    this.layers.push(layer);
    // UI layer
    const uiLayer = new Layer();
    uiLayer.gameObjects.push(new HapinessBar(0.5, 1));
    uiLayer.gameObjects.push(new ItemBar(serviceManager));
    this.layers.push(uiLayer);
    requestAnimationFrame(this.loop);
  }

  loadImage(url: string): HTMLImageElement {
    const img = new Image();
    img.src = url;
    return img;
  }

  loop = () => {
    this.dispatchEvents();
    this.update();
    this.draw();
    requestAnimationFrame(this.loop);
  }

  dispatch( event: GameEvent) {
    this.eventsQueue.push(event);
  }

  private dispatchEvents() {
    while ( this.eventsQueue.length > 0) {
      this.dispatchEvent(this.eventsQueue.shift());
    }
  }

  private dispatchEvent(event: GameEvent) {

    switch (event.type) {
      case 'useitem':
        this.useItem(event.payload);
      break;
    }

    for (const layer of this.layers.slice(0).reverse()) {
      for (const obj of layer.gameObjects) {
        if (obj.processEvent(event)) {
          return;
        }
      }
    }
  }

  useItem(item: Item) {
    console.log('Using item ' + item.name);
  }
  update() {
    const newTime = new Date();
    const deltaTime = (newTime.getTime() - this.lastTime.getTime()) / 1000;
    for (const layer of this.layers) {
      layer.update(deltaTime);
    }
    this.lastTime = newTime;
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
