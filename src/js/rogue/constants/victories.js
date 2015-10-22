
import _ from 'lodash';
import GameState from '../init/gamestate';
import * as Tiles from '../worldgen/tiles/_all';
import { StoneOfSelyk, SelykCellarKey } from '../content/items/_special';
import { Selyk } from '../content/monsters/_special';
import Altar from '../worldgen/maptypes/altar';
import Monster from '../definitions/monster';

class Victory {
  static vp() { return 5; }
  static check() { return true; }
  static get message() { return 'You survived!'; }
  static get description() { return 'Survive!'; }
  static shouldTrigger() { return false; }
  static trigger() {}
  static mapAdditions() {}
  static mapStairs(i) { return [Tiles.StairsUp, i !== GameState.world.depth-1 ? Tiles.StairsDown : null]; }
}

export class Survival extends Victory {
  static vp() { return GameState.world.depth; }
  static requiredTurns() { return GameState.world.depth*1000; }
  static check() { return _.max(GameState.players, 'currentTurn').currentTurn >= this.requiredTurns(); }
  static get message() { return `You survived ${this.requiredTurns()} turns.`; }
  static get description() { return `Survive for ${this.requiredTurns()} turns.`; }
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
  static get description() { return `Find the Stone of Selyk.`; }
}

export class SelykAltar extends Victory {
  static vp() { return 10 * GameState.world.depth; }
  static check() {
    let found = false;
    _.each(GameState.players, (player) => {
      if(player._ascended) found = true;
    });
    return found;
  }
  static mapAdditions() {
    const floor = GameState.world.depth;
    GameState.world.setMapAt(Altar.generate({ z: floor }), floor);
    return true;
  }
  static shouldTrigger() { return GameState.world.depth-1 === GameState.currentFloor+1; }
  static trigger() {
    GameState.world.placeItemAtRandomLocation(new SelykCellarKey(), GameState.currentFloor);
  }
  static get message() { return `You sacrificed yourself at the altar of Selyk.`; }
  static get description() { return `Reach the altar of Selyk.`; }
  static mapStairs(i) { return [Tiles.StairsUp, i !== GameState.world.depth-1 ? Tiles.StairsDown : Tiles.SelykStairsDown]; }
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
  static get description() { return `Kill Selyk.`; }
}