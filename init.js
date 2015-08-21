//todo - make analysis thing for a build that checks all entities and makes sure they have different glyphs/colors

import "./src/debug";
import Start from "./src/game-starter";

if(!ROT.isSupported()) {
  alert('rot.js isn\'t supported :(');
} else {
  Start();
}
