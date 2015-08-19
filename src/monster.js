
import Character from "./character";
import GameState from "./gamestate";

let defaultMonsterStats = {
  str: 8,
  con: 8,
  dex: 8,
  int: 8,
  wis: 8,
  cha: 8
};

export default class Monster extends Character {
  constructor(x, y, z, opts) {
    opts.attributes = _.extend({}, defaultMonsterStats, opts.attributes);
    super(opts.glyph, x, y, z, opts);
    this.difficulty = opts.difficulty;
  }
  
  canAttack(entity) {
    return entity.constructor.name === 'Player';
  }
  
  toJSON() {
    let base = JSON.parse(super.toJSON());
    let me = _.omit(base, 'target');
    return JSON.stringify(me);
  }
}