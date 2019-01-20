import { GameComponent } from 'src/app/game/game.component';
import { ItemService } from 'src/app/service/item.service';
import { Item } from 'src/app/model/item';

export class ServiceManager {
  constructor(private gameWrapper: GameComponent) {}

  useItem(item: Item) {
    this.gameWrapper.itemService.useItem(0, item).subscribe();
  }
}
