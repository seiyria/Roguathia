
class GameState {
  constructor() {
    this.reset();
  }
  reset() {
    this.identification = {};
    this._idMap = {};
  }
  toJSON() {
    return JSON.stringify(_.omit(this, 'game'));
  }
}


export default new GameState();