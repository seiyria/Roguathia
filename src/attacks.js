
import Abstract from "./abstract";
import GameState from "./gamestate";

class Attack extends Abstract {
  constructor(roll, toHit = '0d0', range = 1) {
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
  tryHit(owner, target) {
    //http://nethackwiki.com/wiki/Armor_class
  }
  calcDamage(owner, target) {
    return +dice.roll(this.roll) + owner.calcStatBonus('str');
  }
  hit(owner, target) {
    
  }
}

export var Fist = (roll) => new Attack(roll);
export var Bite = (roll) => new Attack(roll);
export var ElectricTouch = (roll) => new Attack(roll);