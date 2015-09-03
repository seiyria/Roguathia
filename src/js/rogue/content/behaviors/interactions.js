
import _ from 'lodash';
import Behavior, { Priority } from '../../definitions/behavior';
import GameState from '../../init/gamestate';
import MessageQueue from '../../display/message-handler';

/* retrieve items from the ground */
class PickUpItemsBehavior extends Behavior {
  constructor(blacklist = [], whitelist = []) {
    super(Priority.INTERACT);
    this.blacklist = blacklist;
    this.whitelist = whitelist;
  }
  act(me) {
    const items = GameState.world.getItemsAt(me.x, me.y, me.z);
    _.each(items, (item) => {
      if(this.whitelist.length && !_.contains(this.whitelist, item.getType())) return;
      if(this.blacklist.length && _.contains(this.blacklist, item.getType())) return;
      GameState.world.removeItem(item);
      me.addToInventory(item);
      MessageQueue.add({ message: `${me.name} picked up ${item.name}.` });
    });
  }
}

export const PickUpItems = (bl, wl) => new PickUpItemsBehavior(bl, wl);

/* interacts with everything */
class InteractsBehavior extends Behavior {
  constructor() { super(Priority.INTERACT); }
  act(me) {
    const tiles = GameState.world.getAllTilesInRange(me.x, me.y, me.z, 1);

    for(let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];

      if(tile.canInteract && tile.interact && tile.canInteract(me)) {
        const msg = tile.interact(me);
        MessageQueue.add({ message: msg });
        return false;
      }
    }

    return true;
  }
}
export const Interacts = () => new InteractsBehavior();

/* breaks down doors that it finds */
class BreaksDoorsBehavior extends Behavior {
  constructor() { super(Priority.INTERACT); }
  act() {
    return false;
  }
}
export const BreaksDoors = () => new BreaksDoorsBehavior();

/* opens doors that it finds */
class OpensDoorsBehavior extends Behavior {
  constructor() { super(Priority.INTERACT); }
  act(me) {
    const doors = GameState.world.getValidTilesInRange(me.x, me.y, me.z, 1, (tile) => tile.constructor.name === 'Door' && tile.density);
    if(doors.length > 0) {
      const door = doors[0];
      door.interact(me);
      return false;
    }

    return true;
  }
}
export const OpensDoors = () => new OpensDoorsBehavior();