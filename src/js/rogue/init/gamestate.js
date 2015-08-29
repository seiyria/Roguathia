
class GameState {
  constructor() {
    this.reset();
  }
  reset() {
    this.identification = {};
    this._idMap = {};
    this.messages = [];
  }
  toJSON() {
    return JSON.stringify(_.omit(this, 'game'));
  }
}

export default new GameState();