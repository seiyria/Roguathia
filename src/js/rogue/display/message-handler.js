
import GameState from '../init/gamestate';

export default class MessageQueue {
  static add(messageObj) {
    GameState.messages.unshift({ turnsLeft: 4, message: messageObj.message });
    GameState.messages.length = 50; // cap the messages off at the last 50
  }
  
  static viewAllMessages() {
    GameState.messages = _(GameState.messages)
      .compact()
      .each((msg) => msg.turnsLeft--)
      .reject((msg) => msg.turnsLeft <= 0)
      .value();
  }
}