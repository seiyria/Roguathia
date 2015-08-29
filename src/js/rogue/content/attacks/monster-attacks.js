
import * as Behaviors from '../behaviors/behaviors';
import { Attack } from '../../definitions/attack';

export class Bite extends Attack {}

export class ElectricTouch extends Attack {
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