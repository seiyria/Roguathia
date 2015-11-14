
import _ from 'lodash';
import Settings from '../constants/settings';
import GameUpgrades from './gameupgrades';
import { EventEmitter2 } from 'eventemitter2';

class GameState extends EventEmitter2 {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    if(this.players) {
      _.each(this.players, p => p.cleanUp());
    }

    if(this.world) {
      this.world.cleanUp();
      this.world = null;
    }

    if(this.game) {
      this.game.cleanUp();
      this.game = null;
    }

    this.identification = {};
    this._idMap = {};
    this.players = [];
    this.messages = [];
    this.projectiles = [];
    this.splitScreen = false;
    this.currentFloor = 0;

    this.loadExternalOptions();
  }

  loadExternalOptions() {
    this.upgrades = {};
    _.keys(Settings.upgrades)
      .forEach(key => {
        this.upgrades[key] = Settings.upgrades[key] + ~~GameUpgrades[key];
        if(Settings.upgradesMax[key]) {
          this.upgrades[key] = Math.min(Settings.upgradesMax[key], this.upgrades[key]);
        }
      });
  }

  get vpEarned() { return this.winCondition.check() ? this.winCondition.vp() : 0; }
  get kpEarned() { return _.reduce(this.players, ((prev, cur) => prev + cur.totalKpEarned), 0); }
  get spEarned() { return _.reduce(this.players, ((prev, cur) => prev + cur.getScore()), 0); }

  toJSON() {
    return JSON.stringify(_.omit(this, 'game'));
  }
}

export default new GameState();