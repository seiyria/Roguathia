
import _ from 'lodash';
import GameState from '../init/gamestate';
import { StoneOfSelyk } from '../content/items/_special';
import { Selyk } from '../content/monsters/_special';
import Monster from '../definitions/monster';

class Victory {
  static vp() { return 5; }
  static check() { return true; }
  static get message() { return 'You survived!'; }
  static shouldTrigger() { return false; }
  static trigger() {}
}

export class Survival extends Victory {
  static vp() { return GameState.world.depth; }
  static requiredTurns() { return GameState.world.depth*1000; }
  static check() { return _.max(GameState.players, 'currentTurn').currentTurn >= this.requiredTurns(); }
  static get message() { return `You survived ${this.requiredTurns()} turns.`; }
}

export class StoneOfSelykFind extends Victory {
  static vp() { return 3 * GameState.world.depth; }
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

export class KillSelyk extends Victory {
  static vp() { return 20 * GameState.world.depth; }
  static check() {
    let found = false;
    _.each(GameState.players, (player) => {
      if(player.conquest.Selyk) found = true;
    });
    return found;
  }
  static shouldTrigger() { return GameState.world.depth === GameState.currentFloor+1; }
  static trigger() {
    GameState.world.placeEntityAtRandomLocation(new Monster(0, 0, 0, Selyk), GameState.currentFloor);
  }
  static get message() { return `You killed Selyk.`; }
}