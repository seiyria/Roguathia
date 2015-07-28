
import Character from "./character";
import GameState from "./gamestate";

export default class Monster extends Character {
  constructor(x, y, z, opts) {
    super(opts.glyph, x, y, z, opts);
    this.isHostile = true;
  }
  
  act() {
    super.act();
  }
  
  toJSON() {
    let me = _.omit(this, 'game', 'target');
    return JSON.stringify(me);
  }
}