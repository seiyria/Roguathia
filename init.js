// https://github.com/jokeofweek/jsrogue/blob/master/assets/game.js

//todo - make analysis thing for a build that checks all entities and makes sure they have different glyphs/colors

import Game from "./src/game";
import {LoadScreen} from "./src/screens";

if(!ROT.isSupported()) {
  alert('rot.js isn\'t supported :(');
} else {
  var game = new Game();
  document.body.appendChild(game.display.getContainer());
  
  game.switchScreen(LoadScreen);
  
  setTimeout(() => game.setup(), 100);
}
