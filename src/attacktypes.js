
import GameState from "./gamestate";
import MessageQueue from "./message-handler";
import Abstract from "./abstract";

let defaultRollOptions = {
  roll: '1d1',
  toHit: '0d0',
  range: 1
};

export class Attack extends Abstract {
  
  constructor(roll = '1d1', toHit = '0d0', range = 1) {
    super();
    this.roll = roll;
    this.toHit = toHit;
    this.range = range;
  }
  
  inRange(owner, target) { 
    return owner.distBetween(target) <= this.range;
  }
  
  possibleTargets(owner) {
    return GameState.world.getValidEntitiesInRange(owner.x, owner.y, owner.z, this.range, owner.canAttack);
  }
  
  canUse(owner) { return this.possibleTargets(owner).length > 0; }
  
  canHit(owner, target) {
    if(owner.hp.atMin()) return false;
    let hitRoll = +dice.roll('1d20');
    let targetAC = target.getAC() + owner.level + (+dice.roll(this.toHit));

    if(targetAC > 0) {
      return hitRoll < targetAC;
    } else {
      return false;
    }
  }
  
  tryHit(owner, target) {
    if(!this.canHit(owner, target)) {
      let extra = this.missCallback(owner, target);
      MessageQueue.add({message: this.missString(owner, target, extra)});
      return false;
    }
    this.hit(owner, target);
  }
  
  calcDamage(owner, target) {
    return +dice.roll(this.roll) + owner.calcStatBonus('str');
  }
  
  hit(owner, target) {
    let damage = this.calcDamage(owner, target);
    if(damage <= 0) {
      let extra = this.blockCallback(owner, target);
      MessageQueue.add({message: this.blockString(owner, target, extra)});
      return false;
    }
    let extra = this.hitCallback(owner, target, damage);
    MessageQueue.add({message: this.hitString(owner, target, damage, extra)});
    target.takeDamage(damage, owner);
  }
  
  hitString(owner, target, damage) { return `${owner.name} hit ${target.name} for ${damage} damage!`; }
  hitCallback() {}
  
  blockString(owner, target) { return `${target.name} blocked ${owner.name}'s attack!`; }
  blockCallback() {}
  
  missString(owner, target) { return `${owner.name} missed ${target.name}!`; }
  missCallback() {}
}

export class Projectile extends Attack {}
export class Magic extends Projectile {}