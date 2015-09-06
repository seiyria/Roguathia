
import _ from 'lodash';
import Settings from '../constants/settings';
import GameUpgrades from './gameupgrades';

class GameState {
  constructor() {
    this.reset();
  }

  reset() {
    this.identification = {};
    this._idMap = {};
    this.messages = [];
    this.splitScreen = false;
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
    console.log(this.upgrades);
  }

  get vpEarned() { return this.winCondition.vp(); }
  get kpEarned() { return _.reduce(this.players, ((prev, cur) => prev + cur.kpEarned), 0); }
  get spEarned() { return _.reduce(this.players, ((prev, cur) => prev + cur.getScore()), 0); }

  toJSON() {
    return JSON.stringify(_.omit(this, 'game'));
  }
}

export default new GameState();