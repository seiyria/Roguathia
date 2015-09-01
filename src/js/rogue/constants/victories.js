
import GameState from '../init/gamestate';

class Victory {
  static vp() { return 5; }
  static check() { return true; }
  static get message() { return 'You survived!'; }
}

export class Survival extends Victory {
  static requiredTurns() { return GameState.world.depth*1000; }
  static check() { return _.max(GameState.players, 'currentTurn').currentTurn >= this.requiredTurns(); }
  static get message() { return `You survived ${this.requiredTurns()} turns.`; }
}