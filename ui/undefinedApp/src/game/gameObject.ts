export interface GameObject {
  update(deltaTime: number);
  draw(context: CanvasRenderingContext2D);
}
