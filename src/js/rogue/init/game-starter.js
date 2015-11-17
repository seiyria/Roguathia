
import Game from './game';
import GameState, { FreshGame } from './gamestate';
import { LoadScreen } from '../display/screens/load';
import InitDebug from './debug';

export default () => {
  Array.prototype.slice.call(document.getElementsByTagName('canvas')).forEach(
    (item) => {
      item.parentNode.removeChild(item);
    }
  );
  
  FreshGame();
  const game = GameState.game = new Game();
  document.getElementById('game-area').appendChild(game.display.getContainer());
  game.switchScreen(LoadScreen);

  setTimeout(() => {
    game.setup();
    InitDebug();
  }, 300);
};