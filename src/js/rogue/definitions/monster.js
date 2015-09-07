
import _ from 'lodash';
import Character from './character';
import Factions from '../constants/factions';
import GameState from '../init/gamestate';

const defaultMonsterStats = {
  str: 8,
  con: 8,
  dex: 8,
  int: 8,
  wis: 8,
  cha: 8
};

export default class Monster extends Character {
  constructor(x, y, z, opts) {
    opts.stats.profession = 'Monster';
    opts.attributes = _.extend({}, defaultMonsterStats, opts.attributes);
    super(opts.glyph, x, y, z, opts);
    this.difficulty = opts.difficulty;
    this.antiFactions.push(Factions.PLAYER);
    if(opts.startingEquipment) this.loadStartingEquipment(opts.startingEquipment);
  }

  arePlayersAPossibility() {
    const minZ = _.min(GameState.players, 'z').z;
    return minZ <= this.z;
  }

  act() {
    if(!this.arePlayersAPossibility()) {
      return this.removeSelf();
    }
    super.act();
  }
  
  toJSON() {
    const base = JSON.parse(super.toJSON());
    const me = _.omit(base, 'target');
    return JSON.stringify(me);
  }
}