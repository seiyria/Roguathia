
import * as Behaviors from '../behaviors/_all';
import { Attack } from '../../definitions/attack';

export class Bite extends Attack {}
export class Claw extends Attack {}
export class Touch extends Attack {}
export class Bearhug extends Attack {}

export class Poison extends Attack {
  hitString(owner, target, damage, extra) {
    let psn = ``;
    if(extra && !target.hasTrait('PoisonResistance')) {
      psn = ` ${target.name} got poisoned!`;
      target.addUniqueBehavior(Behaviors.Poisoned());
    }
    return `${owner.name} hit ${target.name} for ${damage} damage!${psn}`;
  }
  hitCallback() {
    return true;
  }
}

export class ElectricTouch extends Attack {
  hitString(owner, target, damage, extra) {
    let zap = ``;
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

export class SeductiveTouch extends Attack {
  hitString(owner, target, damage, extra) {
    let sed = ``;
    if(extra) {
      sed = ` ${target.name} is seduced!`;
      target.addUniqueBehavior(Behaviors.Seduced());
    }
    return `${owner.name} hit ${target.name} for ${damage} damage!${sed}`;
  }
  hitCallback() {
    return true;
  }
}

export class TelepathicBlast extends Attack {
  hitString(owner, target, damage) {
    return `${owner.name} got blasted by ${target.name}'s psychic blast for ${damage} damage!`;
  }
  hitCallback(owner) {
    return owner.hasTrait('Telepathy');
  }
}