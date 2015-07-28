
class GameState {
  toJSON() {
    return JSON.stringify(_.omit(this, 'game'));
  }
}


export default new GameState();