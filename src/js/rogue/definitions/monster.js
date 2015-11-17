
import _ from 'lodash';
import Character from './character';
import Factions from '../constants/factions';
import GameState from '../init/gamestate';

import Settings from '../constants/settings';

export default class Monster extends Character {
  constructor(x, y, z, opts) {
    opts.stats.profession = 'Monster';
    opts.attributes = _.extend({}, Settings.game.defaultStats.monster, opts.attributes);
    super(opts.glyph, x, y, z, opts);
    this.difficulty = opts.difficulty;
    this.antiFactions.push(Factions.PLAYER);
    if(opts.addFactions) this.factions.push(...opts.addFactions);
    if(opts.startingEquipment) this.loadStartingEquipment(opts.startingEquipment);

    GameState.monsters.push(this);
  }

  arePlayersAPossibility() {
    const minZ = _.min(GameState.players, 'z').z;
    return minZ <= this.z;
  }

  act() {
    if(!this.arePlayersAPossibility()) {
      return this.removeSelf() && this.cleanUp();
    }
    super.act();
  }

  cleanUp() {
    super.cleanUp();
    this._attackedBy = null;
    this.target = null;
    this._current = null;
  }

  removeSelf() {
    super.removeSelf();
    GameState.monsters = _.without(GameState.monsters, this);
    this.cleanUp();
  }
  
  toJSON() {
    const base = JSON.parse(super.toJSON());
    const me = _.omit(base, 'target');
    return JSON.stringify(me);
  }
}