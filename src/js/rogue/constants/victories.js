
import _ from 'lodash';
import GameState from '../init/gamestate';
import { StoneOfSelyk } from '../content/items/_special';

class Victory {
  static vp() { return 5; }
  static check() { return true; }
  static get message() { return 'You survived!'; }
  static shouldTrigger() { return false; }
  static trigger() {}
}

export class Survival extends Victory {
  static requiredTurns() { return GameState.world.depth*1000; }
  static check() { return _.max(GameState.players, 'currentTurn').currentTurn >= this.requiredTurns(); }
  static get message() { return `You survived ${this.requiredTurns()} turns.`; }
}

export class StoneOfSelykFind extends Victory {
  static vp() { return 15; }
  static check() {
    let found = false;
    _.each(GameState.players, (player) => {
      if(player.hasInInventory(StoneOfSelyk)) found = true;
    });
    return found;
  }
  static shouldTrigger() { return GameState.world.depth === GameState.currentFloor+1; }
  static trigger() {
    GameState.world.placeItemAtRandomLocation(new StoneOfSelyk(), GameState.currentFloor);
  }
  static get message() { return `You found the Stone of Selyk.`; }
}