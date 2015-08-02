
import Abstract from "./abstract";
import GameState from "./gamestate";
import MessageQueue from "./message-handler";

let defaultStringOptions = {
  block: (owner, target) => `${target.name} blocked ${target.name}'s attack!`,
  miss: (owner, target) => `${owner.name} missed ${target.name}!`,
  hit: (owner, target, damage) => `${owner.name} hit ${target.name} for ${damage} damage!`
};

class Attack extends Abstract {
  
  constructor(roll, stringOptions = defaultStringOptions, toHit = '0d0', range = 1) {
    super();
    this.roll = roll;
    this.toHit = toHit;
    this.range = range;
    this.stringOptions = stringOptions;
  }
  
  inRange(owner, target) { 
    return owner.distBetween(target) <= this.range;
  }
  
  possibleTargets(owner) {
    return GameState.world.getValidEntitiesInRange(owner.x, owner.y, owner.z, this.range, owner.canAttack);
  }
  
  canUse(owner) { return this.possibleTargets(owner).length > 0; }
  
  canHit(owner, target) {
    let hitRoll = +dice.roll('1d20');
    let targetAC = target.getAC() - target.calcStatBonus('dex') + owner.level;
   
    if(targetAC > 0) {
      return hitRoll < targetAC;
    } else {
      return false;
    }
  }
  
  tryHit(owner, target) {
    if(!this.canHit(owner, target)) {
      MessageQueue.add({message: this.stringOptions.miss(owner, target)});
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
      MessageQueue.add({message: this.stringOptions.block(owner, target)});
      return false;
    }
    target.takeDamage(damage, owner);
    MessageQueue.add({message: this.stringOptions.hit(owner, target, damage)});
  }
  
}

export var Fist = (roll) => new Attack(roll);
export var Bite = (roll) => new Attack(roll);
export var ElectricTouch = (roll) => new Attack(roll);