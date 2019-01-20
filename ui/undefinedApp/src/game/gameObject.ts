import { GameEvent } from './event';

export interface GameObject {
  processEvent(event: GameEvent): boolean;
  update(deltaTime: number);
  draw(context: CanvasRenderingContext2D);
}
