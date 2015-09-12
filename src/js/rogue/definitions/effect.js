
import MessageQueue from '../display/message-handler';
import GameState from '../init/gamestate';

export default class Effect {
  static get probability() { return 1; }
  static use() {}
  static msg(entity, message) { MessageQueue.add({ entity, message }); }
  static getEmptyTilesInRange(entity, range = 3) {
    return GameState.world.getValidTilesInRange(
      entity.x, entity.y, entity.z, range,
      (tile) => GameState.world.isTileEmpty(tile.x, tile.y, tile.z)
    );
  }
}