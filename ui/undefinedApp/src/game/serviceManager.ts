import { GameComponent } from 'src/app/game/game.component';
import { ItemService } from 'src/app/service/item.service';
import { Item } from 'src/app/model/item';
import { GameEvent } from './event';
import { Pet } from 'src/app/model/pet';
import { User } from 'src/app/model/user';

export class ServiceManager {
  constructor(private gameWrapper: GameComponent) {}

  useItem(item: Item) {
    this.gameWrapper.itemService.useItem(1, item).subscribe(() => {
      this.gameWrapper.game.dispatch(new GameEvent('useitem', item));
    });
  }

  loadUser(userId, callback: Function) {
    this.gameWrapper.userService.getUser(userId).subscribe((user: User) => {
      callback(user);
    });
  }

  loadPet(userId: number, callback: Function) {
    this.gameWrapper.userService.getPetForUser(userId).subscribe((pet: Pet) => {
      callback(pet);
    });
  }
}
