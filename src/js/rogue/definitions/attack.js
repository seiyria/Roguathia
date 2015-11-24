
import _ from 'lodash';
import ROT from 'rot-js';
import dice from 'dice.js';
import Roll from '../lib/dice-roller';
import GameState from '../init/gamestate';
import MessageQueue, { MessageTypes } from '../display/message-handler';
import Abstract from './abstract';
import Glyph from './glyph';
import Log from '../lib/logger';
import { WeightedExtension } from '../lib/rot-extensions';
import MonsterSpawner from '../worldgen/monster-spawner';

import Settings from '../constants/settings';

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
    const hitRoll = Roll(`1d${20 + attackNum}`); // subsequent attacks are less likely to hit
    const targetAC = target.getAC();
    const myToHitBonus = (Roll(this.toHit) - owner.getToHit(target) - owner.getSkillLevel(this.getType()) - (this._itemRef ? this._itemRef.buc-1 : 0)); // cursed: -2, uncursed: 0, blessed: +1
    let targetACRoll = 0;

    if(targetAC >= 0) {
      targetACRoll = targetAC + owner.level - myToHitBonus;
    } else {
      targetACRoll = Settings.game.baseAC + ROT.RNG.getUniformInt(targetAC, -1) + owner.level - myToHitBonus;
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

    let path = [];
    const pathCallback = function(x, y) {
      path.push({ x, y });
    };
    
    astar.compute(owner.x, owner.y, pathCallback);

    path.shift();

    if(!path.length) path = [{ x: owner.x, y: owner.y }];

    const projectile = new Projectile(this.glyph);

    projectile.z = owner.z;
    projectile.x = path[0].x;
    projectile.y = path[0].y;

    GameState.projectiles.push(projectile);

    const moveTo = (x, y) => {
      projectile.x = x;
      projectile.y = y;
      GameState.game.refresh();
    };

    const finalize = () => {
      GameState.projectiles = _.without(GameState.projectiles, projectile);
      GameState.game.refresh();
      callback(); // this has to be called first to prevent race conditions with unlocking the engine and double-dying
      engine.unlock();
    };
    
    moveTo(projectile.x, projectile.y);
    
    _.each(path, function(step, i) {
      const curStep = step;
      setTimeout(function() {
        moveTo(curStep.x, curStep.y);
        if(i === path.length - 1) finalize();
      }, i*(Settings.game.turnDelay/5));
    });
  }
  
  use(owner, target, attackNum) {
    target._attackedBy = owner;
    this.tryHit(owner, target, attackNum);
  }
  
  tryHit(owner, target, attackNum) {
    if(!target) return;
    if(this._itemRef) this._itemRef.use(owner);
    if(!this.canHit(owner, target, attackNum)) {
      const extra = this.missCallback(owner, target);
      MessageQueue.add({ message: this.missString(owner, target, extra), type: MessageTypes.COMBAT });
      return false;
    }
    this.animate(owner, target, () => this.hit(owner, target));
  }

  calcDamage(owner, target) {

    // you can resist some elemental damage!
    if(this.element && target.hasTrait(`${this.element}Resistance`)) {
      return 0;
    }

    let damageBoost = 0;
    if(this._itemRef) {
      damageBoost += this._itemRef.enchantment;
      if(this._itemRef._tempAttackBoost) damageBoost += Roll(this._itemRef._tempAttackBoost);
    }
    const val = Roll(this.roll) + owner.calcStatBonus('str') + damageBoost + owner.getBonusDamage(target);

    if(!_.isNumber(val)) {
      Log('Attack', `Invalid attack roll
      Roll: ${this.roll}
      STR: ${owner.calcStatBonus('str')}
      Boost: ${damageBoost}
      Ref: ${JSON.stringify(this._itemRef)}
      Bonus: ${owner.getBonusDamage(target)}
      MyBonusDamage: ${owner.bonusDamage} (${typeof owner.bonusDamage}) ${owner.rollOrAdd(owner.bonusDamage)}
      MyProfessionBonusDamage: ${owner.professionInst.bonusDamage} (${typeof owner.professionInst.bonusDamage}) ${owner.rollOrAdd(owner.professionInst.bonusDamage)}
      MyRaceBonusDamage: ${owner.raceInst.bonusDamage} (${typeof owner.raceInst.bonusDamage}) ${owner.rollOrAdd(owner.raceInst.bonusDamage)}
      MyTraitValue: ${owner.getTraitValue('bonusDamage')}
      MyFury: ${owner.getTraitVsOpponent(target, 'Fury')} (${typeof owner.getTraitVsOpponent(target, 'Fury')})
      `
      );
    }

    return val;
  }
  
  hit(owner, target) {
    const damage = this.calcDamage(owner, target);
    if(damage <= 0) {
      const extraBlockData = this.blockCallback(owner, target);
      MessageQueue.add({ message: this.blockString(owner, target, extraBlockData), type: MessageTypes.COMBAT });
      return false;
    }
    const extra = this.hitCallback(owner, target, damage);
    MessageQueue.add({ message: this.hitString(owner, target, damage, extra), type: MessageTypes.COMBAT });
    target.takeDamage(damage, owner);
    this.afterHitCallback(owner, target);
  }
  
  hitString(owner, target, damage) { return `${owner.name} hit ${target.name} for ${damage} damage!`; }
  hitCallback(owner) {
    owner.breakConduct('pacifist');

    // TODO this should probably be a behavior
    if(this.spawn && ROT.RNG.getPercentage() <= this.spawnChance) {
      const spawnMe = WeightedExtension(this.spawn).key;
      const validTile = _.sample(GameState.world.getValidTilesInRange(owner.x, owner.y, owner.z, 1, (tile) => GameState.world.isTileEmpty(tile.x, tile.y, tile.z)));
      if(!validTile) return;
      MonsterSpawner.spawnSingle(spawnMe, validTile);
    }

    return ROT.RNG.getPercentage() <= this.percent;
  }
  
  blockString(owner, target) { return `${target.name} blocked ${owner.name}'s attack!`; }
  blockCallback() {}
  
  missString(owner, target) { return `${owner.name} missed ${target.name}!`; }
  missCallback() {}

  afterHitCallback() {}

  cleanUp() {
    this._itemRef = null;
  }
  
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