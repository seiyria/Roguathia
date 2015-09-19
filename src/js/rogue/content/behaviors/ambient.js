
import ROT from 'rot-js';
import Behavior, { Priority } from '../../definitions/behavior';
import GameState from '../../init/gamestate';

/* being stunned sucks */
class EmitsLightBehavior extends Behavior {
  constructor(color = '#fff') {
    super(Priority.ALWAYS);
    this.color = ROT.Color.fromString(color);
  }

  spawn(me) {
    me._lightColor = this.color;
    GameState.world.addLighting(me);
  }

  die(me) {
    GameState.world.removeLighting(me);
  }
}

export const EmitsLight = (color) => new EmitsLightBehavior(color);