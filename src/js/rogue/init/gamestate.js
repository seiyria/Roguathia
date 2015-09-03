
import _ from 'lodash';

class GameState {
  constructor() {
    this.reset();
  }
  reset() {
    this.identification = {};
    this._idMap = {};
    this.messages = [];
    this.splitScreen = false;
  }

  get vpEarned() { return this.winCondition.vp(); }
  get kpEarned() { return _.reduce(this.players, ((prev, cur) => prev + cur.kpEarned), 0); }
  get spEarned() { return _.reduce(this.players, ((prev, cur) => prev + cur.getScore()), 0); }

  toJSON() {
    return JSON.stringify(_.omit(this, 'game'));
  }
}

export default new GameState();