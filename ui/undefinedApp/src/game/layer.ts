import { GameObject } from './gameObject';

export class Layer {
  gameObjects: Array<GameObject> = new Array<GameObject>();
  update(deltaTime: number) {
    for (const gameObj of this.gameObjects) {
      gameObj.update(deltaTime);
    }
  }
  draw(context: CanvasRenderingContext2D) {
    for (const gameObj of this.gameObjects) {
      gameObj.draw(context);
    }
  }
}
