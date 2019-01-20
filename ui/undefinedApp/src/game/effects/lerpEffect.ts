import { Effect } from './effect';

export class Lerp implements Effect {
  t = 0;
  constructor(private progressCallback: Function, private completeCallback: Function, private duration: number) {}
  update(deltaTime: number) {
    this.t += deltaTime;
    let progress = this.t / this.duration;
    if (progress > 1) {
      progress = 1;
      this.progressCallback(progress);
      this.completeCallback();
    } else {
      this.progressCallback(progress);
    }
  }
}
