
import * as Behaviors from "./behaviors";
import {Attack} from "./attacktypes";

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

let attacks = {};
_.each([Fist, Bite, ElectricTouch], (attack) => attacks[attack.name] = (r, h, d) => new attack(r, h, d));
export default attacks;



