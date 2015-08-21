
import Game from "./game";
import GameState from "./gamestate";
import {LoadScreen} from "./screens";

export default () => {
  Array.prototype.slice.call(document.getElementsByTagName('canvas')).forEach(
    (item) => { item.parentNode.removeChild(item); 
  });
  
  var game = GameState.game = new Game();
  document.body.appendChild(game.display.getContainer());
  game.switchScreen(LoadScreen);

  setTimeout(() => game.setup(), 300);
};