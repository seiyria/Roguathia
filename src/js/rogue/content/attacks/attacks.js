
import * as Behaviors from '../behaviors/behaviors';
import { Reagent, Attack } from '../../definitions/attack';
import Glyph from '../../definitions/glyph';

// TODO make some attacks inherit from 'skill increasing' when proficiencies are implemented
// proficiencies should increase damage and to-hit by 1
// maybe proficiency should also factor into value

class Ranged extends Reagent {}

class Unarmed extends Attack {}

class Bite extends Attack {}

class Bash extends Attack {}

class Slash extends Attack {}

class Shot extends Attack {
  init() {
    this.glyph = new Glyph(')', '#00f');
  }
}

class ElectricTouch extends Attack {
  hitString(owner, target, damage, extra) {
    var zap = ``;
    if(extra) {
      zap = ` ${target.name} got zapped!`;
      target.addUniqueBehavior(Behaviors.Stunned());
    }
    return `${owner.name} hit ${target.name} for ${damage} damage!${zap}`;
  }
  hitCallback() {
    return true;
  }
}

class Magic extends Attack {
  init() {
    this.glyph = new Glyph(')', '#f00');
  }
}

class Force extends Magic {}

let attacks = {};
_.each([Unarmed, Ranged, Bash, Bite, Slash, Shot, ElectricTouch, Force], (attack) => attacks[attack.name] = (r, h, d) => new attack(r, h, d));
export default attacks;



