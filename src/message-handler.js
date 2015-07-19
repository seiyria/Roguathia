
import GameState from "./gamestate";

export default class MessageQueue {
  static add(player, message) {
    if(!GameState.messages) GameState.messages = [];
    
    GameState.messages.unshift({name: player.name, turn: player.currentTurn, message: message});
    GameState.messages.length = 50; // cap the messages off at the last 50
  }
}