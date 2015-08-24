
import Game from "./game";
import GameState from "./gamestate";
import {LoadScreen} from "./screens";
import InitDebug from "./debug";

export default () => {
  Array.prototype.slice.call(document.getElementsByTagName('canvas')).forEach(
    (item) => { item.parentNode.removeChild(item); 
  });
  
  GameState.reset();
  var game = GameState.game = new Game();
  document.body.appendChild(game.display.getContainer());
  game.switchScreen(LoadScreen);

  setTimeout(() => {
    game.setup();
    InitDebug();
  }, 300);
};