
import _ from 'lodash';
import GameState from '../init/gamestate';

export default class MessageQueue {
  static add(messageObj) {

    // attempt to hide messages from enemies that are too far away that interact with stuff, if applicable
    if(messageObj.entity) {
      let isInRange = false;
      _.each(GameState.players, player => {
        if(player.distBetween(messageObj.entity) <= player.getSight()) isInRange = true;
      });
      if(!isInRange) return;
    }
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