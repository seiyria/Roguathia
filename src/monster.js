
import Character from "./character";
import GameState from "./gamestate";

let defaultMonsterStats = {
  str: 1,
  con: 1,
  dex: 1,
  int: 1,
  wis: 1,
  cha: 1
};

export default class Monster extends Character {
  constructor(x, y, z, opts) {
    opts.attributes = _.extend({}, defaultMonsterStats, opts.attributes);
    super(opts.glyph, x, y, z, opts);
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