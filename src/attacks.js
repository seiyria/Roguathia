
import * as Behaviors from "./behaviors";
import {Attack, Projectile} from "./attacktypes";
import Glyph from "./glyph";

class Fist extends Attack {}

class Bite extends Attack {}

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

class DeathRay extends Attack {
  init() {
    this.glyph = new Glyph(')', '#f00');
  }
}

let attacks = {};
_.each([Fist, Bite, ElectricTouch, DeathRay], (attack) => attacks[attack.name] = (r, h, d) => new attack(r, h, d));
export default attacks;



