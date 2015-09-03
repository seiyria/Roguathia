
import GameState from '../init/gamestate';
import MessageQueue from '../display/message-handler';
import Abstract from './abstract';
import Glyph from './glyph';

export class Projectile {
  constructor(glyph) {
    this.glyph = glyph;
  }
}

export class Attack extends Abstract {
  
  constructor(opts) {
    super();
    _.extend(this, { roll: '1d4', toHit: '0d0', range: 1, chance: 100 }, opts);
    if(this.init) this.init();
  }
  
  value() {
    return dice.statistics(this.roll).mean + dice.statistics(this.toHit) + this.range * 3;
  }
  
  inRange(owner, target) { 
    return owner.distBetween(target) <= this.range;
  }
  
  possibleTargets(owner) {
    const possibleTargets = [];
    GameState.world.fov[owner.z].compute(
      owner.x, owner.y, this.range, 
      (x, y) => {
        const entity = GameState.world.getEntity(x, y, owner.z);
        if(!entity) return;
        // no target, can't attack target, or the target is invisible and hasn't attacked you yet
        const canOwnerSee = owner.canSee(entity);
        const sightCheck = canOwnerSee || (!canOwnerSee && owner._attackedBy !== entity);
        if(!owner.canAttack(entity) || !sightCheck) return;
        possibleTargets.push(entity);
      }
    );
    return possibleTargets;
  }
  
  canUse(owner) { 
    if(ROT.RNG.getPercentage() > this.chance) return;
    return this.possibleTargets(owner).length > 0; 
  }
  
  canHit(owner, target, attackNum) {
    if(owner.hp.atMin()) return false;
    const hitRoll = +dice.roll(`1d${20 + attackNum}`); // subsequent attacks are less likely to hit
    const targetAC = target.getAC();
    const myToHitBonus = (+dice.roll(this.toHit) - owner.getToHit() - owner.getSkillLevel(this.getType()) - (this._itemRef ? this._itemRef.buc-1 : 0)); // cursed: -2, uncursed: 0, blessed: +1
    let targetACRoll = 0;

    if(targetAC >= 0) {
      targetACRoll = targetAC + owner.level - myToHitBonus;
    } else {
      targetACRoll = 10 + ROT.RNG.getUniformInt(targetAC, -1) + owner.level - myToHitBonus;
    }
    return hitRoll < targetACRoll;
  }
  
  animate(owner, target, callback) {
    if(!this.glyph) return callback();

    const engine = GameState.game.engine;
    engine.lock();

    const canPass = (x, y) => {
      const entity = GameState.world.getEntity(x, y, owner.z);
      const isAttackable = entity && owner.canAttack(entity);
      const isMe = owner.x === x && owner.y === y;
      return GameState.world.isTilePassable(x, y, owner.z, false) || isMe || isAttackable;
    };
    const astar = new ROT.Path.AStar(target.x, target.y, canPass, { topology: 8 });

    const path = [];
    const pathCallback = function(x, y) {
      path.push({ x, y });
    };
    
    astar.compute(owner.x, owner.y, pathCallback);

    path.shift();

    const projectile = new Projectile(this.glyph);
    projectile.z = owner.z;
    projectile.x = path[0].x;
    projectile.y = path[0].y;

    const moveTo = (x, y) => {
      GameState.world.moveEntity(projectile, x, y, projectile.z);
      GameState.game.refresh();
    };

    const finalize = () => {
      GameState.world.removeEntity(projectile);
      callback();
      GameState.game.refresh();
      engine.unlock();
    };
    
    moveTo(projectile.x, projectile.y);
    
    _.each(path, (step, i) => {
      const curStep = step;
      setTimeout(() => {
        moveTo(curStep.x, curStep.y);
        if(i === path.length - 1) finalize();
      }, i*50);
    });
  }
  
  use(owner, target, attackNum) {
    target._attackedBy = owner;
    this.tryHit(owner, target, attackNum);
  }
  
  tryHit(owner, target, attackNum) {
    if(!target) return;
    if(this._itemRef) this._itemRef.use(owner, target);
    if(!this.canHit(owner, target, attackNum)) {
      const extra = this.missCallback(owner, target);
      MessageQueue.add({ message: this.missString(owner, target, extra) });
      return false;
    }
    this.animate(owner, target, () => this.hit(owner, target));
  }// this class is internal

  
  calcDamage(owner) {
    let damageBoost = 0;
    if(this._itemRef) {
      damageBoost += this._itemRef.enchantment;
      if(this._itemRef._tempAttackBoost) damageBoost += +dice.roll(this._itemRef._tempAttackBoost);
    }
    return +dice.roll(this.roll) + owner.calcStatBonus('str') + damageBoost;
  }
  
  hit(owner, target) {
    const damage = this.calcDamage(owner, target);
    if(damage <= 0) {
      const extra = this.blockCallback(owner, target);
      MessageQueue.add({ message: this.blockString(owner, target, extra) });
      return false;
    }
    const extra = this.hitCallback(owner, target, damage);
    MessageQueue.add({ message: this.hitString(owner, target, damage, extra) });
    target.takeDamage(damage, owner);
  }
  
  hitString(owner, target, damage) { return `${owner.name} hit ${target.name} for ${damage} damage!`; }
  hitCallback(owner) {
    owner.breakConduct('pacifist');
  }
  
  blockString(owner, target) { return `${target.name} blocked ${owner.name}'s attack!`; }
  blockCallback() {}
  
  missString(owner, target) { return `${owner.name} missed ${target.name}!`; }
  missCallback() {}
  
  toJSON() {
    const me = _.omit(this, ['_itemRef']);
    return JSON.stringify(me);
  }
}

export class SkilledAttack extends Attack {
  hitCallback(owner) {
    super.hitCallback(owner);
    if(this.getType() !== 'Unarmed') {
      owner.breakConduct('wieldedWeapon');
    }
    owner.increaseSkill(this.getType());
  }
}

export class Reagent extends SkilledAttack {

  isValidRangedAttack(owner) {
    return this._itemRef && this._itemRef.canUse(owner) && this._itemRef.hasValidAmmo(owner);
  }

  use(owner, target, attackNum) {
    if(this.isValidRangedAttack(owner)) return this._itemRef.use(owner);
    return super.use(owner, target, attackNum);
  }
}

export class Magic extends SkilledAttack {
  init() {
    this.glyph = new Glyph(')', '#f00');
  }
}