import { Layer } from './layer';
import { Pet } from './gameObjects/pet';
import { Background } from './gameObjects/background';
import { HapinessBar } from './gameObjects/hapinessBar';
import { ItemBar } from './gameObjects/itemBar';
import { GameEvent } from './event';
import { ServiceManager } from './serviceManager';
import { Item } from 'src/app/model/item';
import { ItemObject } from './gameObjects/itemObject';
import { Pet as ModelPet } from 'src/app/model/pet';
import { User } from 'src/app/model/user';
import { AwardPopup } from './gameObjects/awardPopup';

export class Game {

  state = {
    x: 0.5,
    y: 0.5,
    w: 0.1,
    h: 0.1,
  };

  eventsQueue: Array<GameEvent> = new Array<GameEvent>();
  layers: Array<Layer> = new Array<Layer>();
  lastTime = new Date();
  imagesBaseUrl = 'http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com';

  constructor(private context: CanvasRenderingContext2D, private serviceManager: ServiceManager, private user: User) {
    // Background Layer
    const bgLayer = new Layer();
    const wallImg = this.loadImage('../assets/wall.png');
    const floorImg = this.loadImage('../assets/floor.png');
    bgLayer.gameObjects.push(new Background(floorImg, wallImg));
    this.layers.push(bgLayer);
    // Pet layer
    const layer = new Layer();

    this.layers.push(layer);
    // UI layer
    const uiLayer = new Layer();
    const happinessBar = new HapinessBar(0, 0);
    uiLayer.gameObjects.push(happinessBar);
    uiLayer.gameObjects.push(new ItemBar(serviceManager));
    this.layers.push(uiLayer);

    serviceManager.loadPet(user.USER_ID, (pet: ModelPet) => {
      const petImg = this.loadImage('http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com' + pet.PET_IMG_URL);
      layer.gameObjects.push(new Pet(petImg));
      this.dispatch(new GameEvent('sethappiness', pet.HAPPINESS_SCORE / 100));

      if (user.MONEY_TO_AWARD !== 0 || pet.HAPPINESS_TO_AWARD !== 0 || true) {
        uiLayer.gameObjects.push(new AwardPopup(user, pet.HAPPINESS_TO_AWARD, uiLayer, this));
      }
    });
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
    console.log('Using item ' + item.ITEM_TYPE_NAME);
    // Spawn the item in the world
    const objectLayer = this.layers[1];
    const itemObject = new ItemObject(0.25, 0.55, this.loadImage(this.imagesBaseUrl + item.ITEM_IMG_URL));
    objectLayer.gameObjects.push(itemObject);
    // Command the pet to move to it
    const pet = <Pet>objectLayer.gameObjects[0];
    pet.moveTo(0.25, () => {
      // Activate effect
      this.dispatch(new GameEvent('addhappiness', item.HAPPINESS_BOOST * 0.01));
      objectLayer.gameObjects = objectLayer.gameObjects.filter(obj => obj !== itemObject);
    });
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
