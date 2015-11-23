
import _ from 'lodash';
import ROT from 'rot-js';
import Roll from '../lib/dice-roller';
import Entity from './entity';
import NumberRange from '../lib/number-range';
import Professions from '../content/professions/_all';
import Races from '../content/races/_all';
import * as Behaviors from '../content/behaviors/_all';
import GameState from '../init/gamestate';
import Attacks from '../content/attacks/_all';
import MessageQueue, { MessageTypes } from '../display/message-handler';

import loadValue from '../lib/value-assign';
import calc from '../lib/directional-probability';
import Log from '../lib/logger';
import Id from '../lib/gen-id';

import SkillThresholds, * as Thresholds from '../constants/skill-thresholds';
import { SkilledAttack } from '../definitions/attack';

import Settings from '../constants/settings';

const defaultBehaviors = [Behaviors.RegeneratesHp(), Behaviors.RegeneratesMp()];

export default class Character extends Entity {

  constructor(glyph, x, y, z, opts = { stats: {}, attributes: {} }) {
    super(glyph, x, y, z);

    this.__id = Id();

    this.factions = [];
    this.antiFactions = [];
    this.traits = [];
    this.traitHash = {};
    this.skills = {};
    this.brokenConduct = {};

    this.currentTurn = 0;

    _.extend(this, Settings.game.defaultStats.attributes, opts.attributes, loadValue);
    _.extend(this, Settings.game.defaultStats.stats, opts.stats);

    this.behaviors.push(...defaultBehaviors);

    this.professionInst = new Professions[this.profession]();
    const [profHp, profMp] = [this.professionInst.hp, this.professionInst.mp];
    this.hp = new NumberRange(0, this.spawnHp+profHp, this.spawnHp+profHp);
    this.mp = new NumberRange(0, this.spawnMp+profMp, this.spawnMp+profMp);
    this.xp = new NumberRange(0, 0, this.calcLevelXp(this.level));
    this.factions.push(...this.professionInst.addFactions);
    this.behaviors.push(...this.professionInst.addBehaviors);

    this.raceInst = new Races[this.race]();
    this.factions.push(...this.raceInst.addFactions);
    this.behaviors.push(...this.raceInst.addBehaviors);

    if(opts.addFactions) this.factions.push(...opts.addFactions);
    if(opts.addAntiFactions) this.antiFactions.push(...opts.addAntiFactions);

    this.sortBehaviors();

    this.inventory = [];
    this.equipment = {};

    GameState.world.moveEntity(this, this.x, this.y, this.z);

    // calculate levelup bonuses
    for(let i=1; i<this.level; i++) {
      this.levelupStatBoost();
    }

    GameState.game.scheduler.add(this, true);

    this.doBehavior('spawn');

    this.loadStartingEquipment();
    this.loadStartingSkills();
  }

  // region Static functions
  calcLevelXp(level) {
    return 10 * Math.pow(2, level);
  }

  rollOrAdd(val) {
    val = _.isString(val) ? Roll(val) : val;
    return !val || _.isNaN(val) || !_.isNumber(val) ? 0 : val;
  }
  // endregion

  // region Trait functions
  getTraits() {
    return this.traits.concat(this.raceInst.traits).concat(this.professionInst.traits).concat(_.flatten(_.values(this.equipment)));
  }

  hasTrait(propertyName) {
    if(this.traitHash[propertyName]) return this.traitHash[propertyName];
    return _.contains(_.pluck(this.getTraits(), 'constructor.name'), `${propertyName}Trait`);
  }

  getTraitValue(property, defaultVal = 0) {
    if(this.traitHash[property]) return this.traitHash[property];
    const properties = this.getTraits();
    const value = _.reduce(properties, ((prev, prop) => prev + (prop[property] && prop.canUse(this) ? prop[property]() : defaultVal)), defaultVal);
    this.traitHash[property] = value;
    return value;
  }

  addTrait(property) {
    this.traits.push(property);
    this.flushTraits(property.constructor.name);
  }

  removeTrait(property) {
    this.traits = _.without(this.traits, property);
    this.flushTraits(property.constructor.name);
  }

  flushTraits(key) {
    if(key) return delete this.traitHash[key];
    this.traitHash = {};
  }
  // endregion

  // region Skill-related functions
  increaseSkill(type) {
    if(!this.skills[type]) return;
    this.skills[type].add(1);
  }

  getSkillLevel(type) {
    if(!this.skills[type]) return 0;
    const curNum = this.skills[type].cur;
    const level = _.reject(SkillThresholds, threshold => threshold.max < curNum)[0];
    return Thresholds[level.name];
  }
  // endregion

  // region Loading functions (skills, equipment)
  loadStartingSkills() {
    const skillCaps = this.professionInst.skillCaps;
    const skillBonus = this.raceInst.skillBonus;
    const defaultLevel = Thresholds.Basic;
    _.each(_.values(Attacks), (atk) => {
      if(!(atk.real.prototype instanceof SkilledAttack)) return;
      const atkName = atk.real.name.toLowerCase();
      let maxLevel = defaultLevel + (skillCaps[atkName] || 0);
      maxLevel = Math.min(maxLevel, Thresholds.Legendary);
      const level = skillBonus[atkName] || 0;
      this.skills[atkName] = new NumberRange(0, SkillThresholds[level].max, SkillThresholds[maxLevel].max);
    });
  }

  loadStartingEquipment(list = this.professionInst.startingItems) {
    if(!list) return;
    _.each(list, (item) => {
      if(item.probability && ROT.RNG.getPercentage() > item.probability) return;

      let inst = null;
      if(item.choices) {
        const choice = ROT.RNG.getWeightedValue(item.choices);
        inst = item.choicesInit[choice]();
      } else {
        inst = item.init();
      }

      if(!_.isArray(inst)) {
        inst = [inst];
      }

      _.each(inst, item => this.addToInventory(item));
    });
  }
  // endregion

  // region Inventory functions (stacking, add, remove, etc)
  tryToStack(item) {
    if(!item.charges) return;
    let didStack = false;
    _.each(this.inventory, (testItem) => {
      if(testItem.getType() !== item.getType()) return;
      if(testItem.buc !== item.buc || testItem.enchantment !== item.enchantment) return;
      testItem.charges += item.charges;
      didStack = true;
    });
    return didStack;
  }

  hasInInventory(itemProto) {
    return _.find(this.inventory, (item) => item.getType() === itemProto.name.toLowerCase());
  }

  dropItem(item) {
    item._canPickUpTurn = this.currentTurn + 5;
    this.removeFromInventory(item);
    GameState.world.moveItem(item, this.x, this.y, this.z);
  }

  addToInventory(item) {
    if(item.goldValue) {
      this.gold += item.goldValue;
      return;
    }
    if(this.tryToStack(item)) return;
    if(this.tryEquip(item)) return;
    this.inventory.push(item);
  }

  removeFromInventory(item) {
    this.inventory = _.without(this.inventory, item);
  }
  // endregion

  // region Equip-related (slot-checking, equip, unequip, etc)
  isEquipped(item) {
    const slot = item.getParentType();
    return _.contains(this.equipment[slot], item);
  }

  slotsTaken(slot) {
    if(!this.equipment[slot]) return 0;
    return _.reduce(this.equipment[slot], ((prev, item) => prev + item.slotsTaken), 0);
  }

  canEquip(item) {
    return this.raceInst.canEquip(this, item);
  }

  equip(item) {
    const slot = item.getParentType();
    if(!this.equipment[slot]) this.equipment[slot] = [];
    this.equipment[slot].push(item);
    this.breakConduct('stubborn');
    if(this.getType() !== 'Hands') {
      this.breakConduct('nudist');
    }
    if(item.equip) item.equip(this);
    this.flushTraits();
  }

  getWorseItemsThan(item) {
    const slot = item.getParentType();
    return _(this.equipment[slot]).filter((equip) => equip.value() < item.value() && item.bucName !== 'cursed');
  }

  shouldEquip(item) {
    const slot = item.getParentType();
    if(this.raceInst.slots[slot] > 0 && this.canEquip(item)) return true;
    const lowerItems = this.getWorseItemsThan(item);
    return lowerItems.length < item.slotsTaken;
  }

  tryEquip(item) {
    if(!this.canEquip(item) || !this.shouldEquip(item)) return false;
    const worseItems = this.getWorseItemsThan(item);
    if(worseItems.length < item.slotsTaken) return false; // cursed items

    if(worseItems.length > 0) {
      for(let i=0; i<item.slotsTaken; i++) {
        this.unequip(worseItems[i]);
      }
    }
    this.equip(item);
    return true;
  }

  unequip(item) {
    const slot = item.getParentType();
    this.equipment[slot] = _.without(this.equipment[slot], item);
    this.inventory.push(item);
    if(item.unequip) item.unequip(this);
  }
  // endregion

  // region Behavior-related functions
  doBehavior(action, args = []) {
    args.unshift(this);
    _.each(this.behaviors, (behavior) => { if(behavior[action]) return behavior[action].apply(behavior, args); }); // returning false from any behavior will cancel subsequent ones
  }

  sortBehaviors() {
    this.behaviors = _.sortBy(this.behaviors, 'priority');
  }

  addBehavior(behavior) {
    this.behaviors.push(behavior);
    this.sortBehaviors();
  }

  hasBehavior(behavior) {
    if(!_.contains(behavior, 'Behavior')) behavior = `${behavior}Behavior`;
    return _.contains(_.pluck(this.behaviors, 'constructor.name'), behavior);
  }

  addUniqueBehavior(behavior) {
    if(this.hasBehavior(behavior.constructor.name)) return;
    this.addBehavior(behavior);
  }

  removeBehavior(behavior) {
    this.behaviors = _.without(this.behaviors, behavior);
  }
  // endregion

  // region Damage / dying / targetting
  takeDamage(damage, attacker) {
    this.hp.sub(damage);
    this.doBehavior('takeDamage', [attacker]);
    if(this.hp.atMin()) {
      this.die(attacker);
    }
  }

  die(killer) {
    this.hp.toMin();
    if(this.killerName) {
      Log('Player', `Error: Attempting to die twice. Previous killer: ${this.killerName} (${this.__killerId}), Usurper: ${killer.name} (${killer.__id})`, true);
      return;
    }
    this.doBehavior('die');
    MessageQueue.add({ message: `${this.name} was killed by ${killer.name}!`, type: MessageTypes.COMBAT });
    if(killer.kill) killer.kill(this);

    this.__killerId = killer.__id;
    this.killerName = killer.name;
    this.removeSelf();
  }

  removeSelf() {
    GameState.world.removeEntity(this);
    GameState.game.scheduler.remove(this);
  }

  cleanUp() {
    _.each(this.attacks, a => a.cleanUp());
    this.behaviors = null;
    this.inventory = null;
    this.equipment = null;
    this.attacks = null;
    this._path = null;
    this._attackedBy = null;

    this.professionInst = null;
    this.raceInst = null;

    this.conquest = null;
    this.traits = null;
    this.traitHash = null;
    this.skills = null;
  }

  kill(dead) {
    this.gainXp(dead.killXp);
    this.doBehavior('kill');
  }

  setTarget(newTarget) {
    this.target = newTarget;
  }
  // endregion

  // region Movement (pathfinding, stepping)
  stepRandomly() {
    const tiles = GameState.world.getAllTilesInRange(this.x, this.y, this.z, 1);
    const validTiles = _.map(tiles, (tile, i) => GameState.world.isTileEmpty(tile.x, tile.y, tile.z) ? i+1 : null); // 1-9 instead of 0-8
    let direction = _(validTiles).compact().sample() - 1; // adjustment for array
    let newTile = tiles[direction]; // default to a random tile

    if(this.lastDirection) {
      const probs = calc(this.lastDirection + 1); // adjust for array
      const choices = _(validTiles).map(tileIndex => tileIndex ? [tileIndex, probs[tileIndex]] : null).compact().zipObject().value();
      direction = parseInt(ROT.RNG.getWeightedValue(choices)) - 1;
      newTile = tiles[direction];
    }

    if(!newTile) return; // surrounded
    this.move(newTile);
    this.lastDirection = direction;
    this.doBehavior('step');
  }

  stepTowards(target) {
    if(!this.canSee(target)) {
      return this.stepRandomly();
    }
    const path = [];
    const addPath = (x, y) => path.push({ x, y });
    target._path.compute(this.x, this.y, addPath);

    path.shift();
    const step = path.shift();
    if(!step) return false;

    const blockingEntityInfo = (path) => {
      let entity = null;
      let step = null;
      _.each(path, (newStep, i) => {
        const testEntity = GameState.world.getEntity(newStep.x, newStep.y, this.z);
        if(testEntity && !this.canAttack(testEntity)) {
          entity = testEntity;
          step = i;
          return false;
        }
      });
      return { entity, step };
    };

    const mainBlockingInfo = blockingEntityInfo(path);

    // the main path is blocked
    if(mainBlockingInfo.entity) {
      const altPath = this.getAlternatePathTo(target);

      // no alternate path could be generated
      if(!altPath) {
        this.moveTo(step.x, step.y);
        return true;
      }

      const altBlockingInfo = blockingEntityInfo(altPath);

      // both are blocked, take the shortest path
      if(mainBlockingInfo.entity && altBlockingInfo.entity) {
        const newPath = _.min([path, altPath], (testPath) => testPath.length);
        const newStep = newPath.shift();
        this.moveTo(newStep.x, newStep.y);

      // the alt path isn't blocked, take that
      } else {
        const newStep = altPath.shift();
        this.moveTo(newStep.x, newStep.y);
      }

    // no blockers, keep moving on
    } else {
      this.moveTo(step.x, step.y);
    }

    this.doBehavior('step');
    return true;
  }

  getAlternatePathTo(target) {
    const canPass = (x, y) => {
      const entity = GameState.world.getEntity(x, y, this.z);
      const isAttackable = entity && this.canAttack(entity);
      const isMe = this.x === x && this.y === y;
      return GameState.world.isTilePassable(x, y, this.z) || isMe || isAttackable;
    };
    const astar = new ROT.Path.AStar(target.x, target.y, canPass);

    const path = [];
    astar.compute(this.x, this.y, (x, y) => path.push({ x, y }));

    path.shift();
    const step = path.shift();
    if(!step) return null;
    return path;
  }

  moveTo(x, y) {
    return GameState.world.moveEntity(this, x, y, this.z);
  }

  move(newTile) {
    return GameState.world.moveEntity(this, newTile.x, newTile.y, newTile.z);
  }

  alertAllInRange(soundRange = this.getSoundEmission()) {
    const entities = GameState.world.getValidEntitiesInRange(this.x, this.y, this.z, soundRange, (entity) => entity.canAttack(this));
    _.each(entities, (entity) => {
      entity.doBehavior('hear', [this]);
    });
  }
  // endregion

  // region Attack-related (vision, attacking, etc)
  getAttacks() {
    const baseAttacks = this.attacks || [];
    const racialAttacks = baseAttacks.concat(this.raceInst.attacks);
    let attacks = racialAttacks.concat(_(this.equipment).values().flatten().filter((item) => item.canUse(this) && item.attacks).pluck('attacks').flatten().value());
    if(attacks.length === 0) attacks = [Attacks.Unarmed()];
    const inventoryAttacks = _(this.inventory).filter((item) => item.canUse(this) && item.attacks).pluck('attacks').flatten().value();

    // all melee attacks are valid, but only one ranged inventory attack can be used
    if(_.some(attacks, (atk) => atk.canUse(this))) return attacks;
    return _.compact([_(inventoryAttacks).filter((atk) => atk.canUse(this)).sample()]);
  }

  canSee(entity) {
    return this.getTraitValue('SeeInvisible') >= entity.getTraitValue('Invisible');
  }

  canAttack(entity) {
    if(entity.hp.atMin()) return false;
    // they have a faction that you are against
    return _.intersection(entity.factions, this.antiFactions).length > 0 ||

      // or you attack everything but your own faction
      (_.contains(this.antiFactions, 'all') && _.intersection(entity.factions, this.factions).length === 0);
  }

  doAttack(attack, hitNum) {
    const target = attack.possibleTargets(this)[0];
    if(!target) return; // possibly a multi-shot attack that has killed early
    attack.use(this, target, hitNum);
  }

  tryAttack() {
    const attacks = this.getAttacks();
    if(attacks.length === 0) return false;

    _.each(attacks, (atk, i) => this.doAttack(atk, i));
    return true;
  }
  // endregion

  // region Levelup/XP functions
  calcLevelHpBonus() {
    return Roll(this.professionInst.config.hp) + this.calcStatBonus('con');
  }

  calcLevelMpBonus() {
    return Roll(this.professionInst.config.mp) + this.calcStatBonus('int');
  }

  gainXp(number) {
    if(this.hp.atMin()) return;
    this.xp.add(number);
    if(this.xp.atMax()) {
      this.levelup();
    }
  }

  levelup() {
    this.level += 1;
    this.xp.max = this.calcLevelXp(this.level);
    this.levelupStatBoost();

    // resets
    this.xp.toMin();
    this.hp.toMax();
    this.mp.toMax();

    this.flushTraits();
    MessageQueue.add({ message: `${this.name} has reached experience level ${this.level}!`, type: MessageTypes.CHARACTER });
  }

  levelupStatBoost() {
    this.professionInst.levelup();
    this.hp.max += this.calcLevelHpBonus();
    this.mp.max += this.calcLevelMpBonus();
  }
  // endregion

  // region Stat manipulation
  abuse(stat, loss = '1d1') {
    this[stat] = Math.max(this[stat]-(Roll(loss)), Settings.game.minStatValue);
  }

  exercise(stat, gain = '1d1') {
    this[stat] += (Roll(gain));
  }
  // endregion

  // region Getters (Stats, etc)
  getTraitVsOpponent(target, trait) {
    if(!target) return 0;
    return _.reduce(target.factions, (prev, cur) => prev + this.getTraitValue(`${cur}${trait}`), 0);
  }

  getAlign() {
    if(this.align <= -Settings.game.alignThreshold) return 'Evil';
    if(this.align >= Settings.game.alignThreshold) return 'Good';
    return 'Neutral';
  }

  getStat(stat) {
    return this.rollOrAdd(this[stat]) +
           this.rollOrAdd(this.professionInst[stat]) +
           this.rollOrAdd(this.raceInst[stat]) +
           this.getTraitValue(stat);
  }

  getStatWithMin(stat, min = 0) {
    return Math.max(min, this.getStat(stat));
  }

  getRegenHp() {
    return this.getStatWithMin('regenHp', 1);
  }

  getRegenMp() {
    return this.getStatWithMin('regenMp', 1);
  }

  getBonusDamage(target = null) {
    return this.getStat('bonusDamage') + this.getTraitVsOpponent(target, 'Fury');
  }

  getToHit(target = null) {
    return this.getStat('toHit') + this.getTraitVsOpponent(target, 'Bane');
  }

  getSight() {
    return this.getStatWithMin('sight') + this.getTraitValue('Infravision');
  }

  getSpeed() {
    return this.getStatWithMin('speed') + this.getTraitValue('Haste');
  }

  getSoundEmission() {
    return this.getStatWithMin('sound') - this.getTraitValue('Stealth');
  }

  getAC() {
    return Settings.game.baseAC + this.getStat('ac') - this.calcStatBonus('dex') - this.getTraitValue('Protection');
  }

  getStr() {
    return this.getStatWithMin('str');
  }

  getDex() {
    return this.getStatWithMin('dex');
  }

  getCon() {
    return this.getStatWithMin('con');
  }

  getInt() {
    return this.getStatWithMin('int');
  }

  getWis() {
    return this.getStatWithMin('wis');
  }

  getCha() {
    return this.getStatWithMin('cha');
  }

  getLuk() {
    return this.getStatWithMin('luk');
  }

  hasFaction(faction) {
    return _.contains(this.factions, faction);
  }
  // endregion (Stats, etc)

  act() {
    this.currentTurn++;
    this.doBehavior('act');
  }

  breakConduct(conduct) {
    this.brokenConduct[conduct] = true;
  }

  calcDifficulty(entity) {
    return Math.max(1, Math.min(5, Math.floor((entity.level - this.level) / 2)));
  }

  heal(value) {
    if(!value || !_.isNumber(value) || _.isNaN(value)) {
      Log('Character', `Value given to heal was not well formed: ${value}`);
    }
    this.hp.add(value);
  }

  // -2 = 4/5, -1 = 6/7, 0 = 8, +1 = 9/10, +2 = 10/11 (etc)
  calcStatBonus(stat) {
    return Math.floor(this[`get${_.capitalize(stat)}`]() / 2) - 4;
  }

  toJSON() {
    const me = _.omit(this, ['game', '_path', 'traitHash', '_attackedBy', '__id', '__killerId']);
    return JSON.stringify(me);
  }
}
