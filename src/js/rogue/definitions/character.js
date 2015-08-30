
import Entity from './entity';
import NumberRange from '../lib/number-range';
import Professions from '../content/professions/_all';
import Races from '../content/races/_all';
import * as Behaviors from '../content/behaviors/behaviors';
import GameState from '../init/gamestate';
import Attacks from '../content/attacks/_all';
import MessageQueue from '../display/message-handler';

import loadValue from '../lib/value-assign';
import calc from '../lib/directional-probability';

import SkillThresholds, * as Thresholds from '../constants/skill-thresholds';
import { SkilledAttack } from '../definitions/attack';

import Settings from '../constants/settings';

const defaultAttributes = {
  ac:  0,
  str: 8,
  con: 8,
  dex: 8,
  int: 8,
  wis: 8,
  cha: 8,
  luk: 0,
  gold: 0,
  level: 1,
  align: 0, 
  speed: Settings.game.baseSpeed,
  sight: Settings.game.baseSight,
  killXp: '0d0',
  spawnHp: '15d1',
  spawnMp: '0d0',
  regenHp: 20,
  regenMp: 10
};

const defaultStats = {
  gender: 'None', 
  name: 'Dudley',
  race: 'Human',
  attacks: [],
  behaviors: [],
  skills: {},
  profession: 'Developer'
};

const defaultBehaviors = [Behaviors.RegeneratesHp(), Behaviors.RegeneratesMp()];

export default class Character extends Entity {
  
  constructor(glyph, x, y, z, opts = { stats: {}, attributes: {} }) {
    super(glyph, x, y, z);

    this.factions = [];
    this.antiFactions = [];
    this.traits = [];
    this.traitHash = {};
    this.skills = {};
    this.brokenConduct = {};
    
    this.currentTurn = 0;
    
    _.extend(this, defaultAttributes, opts.attributes, loadValue);
    _.extend(this, defaultStats, opts.stats);

    this.behaviors.push(...defaultBehaviors);
    
    this.sortBehaviors();
    
    this.professionInst = new Professions[this.profession]();
    let [profHp, profMp] = [this.professionInst.hp, this.professionInst.mp];
    this.hp = new NumberRange(0, this.spawnHp+profHp, this.spawnHp+profHp);
    this.mp = new NumberRange(0, this.spawnMp+profMp, this.spawnMp+profMp);
    this.xp = new NumberRange(0, 0, this.calcLevelXp(this.level));
    this.factions.push(...this.professionInst.addFactions);
    
    this.raceInst = new Races[this.race]();
    this.factions.push(...this.raceInst.addFactions);
    
    this.inventory = [];
    this.equipment = {};
    
    GameState.world.moveEntity(this, this.x, this.y, this.z);
    
    this.loadStartingEquipment();
    this.loadStartingSkills();
     
    this.game = GameState.game;
    this.game.scheduler.add(this, true);
  }

  canSee(entity) {
    return this.getTraitValue('SeeInvisible') > entity.getTraitValue('Invisible');
  }

  calcDifficulty(entity) {
    return Math.max(1, Math.min(5, Math.floor((entity.level - this.level) / 2)));
  }

  getTraits() {
    return this.traits.concat(this.raceInst.traits).concat(this.professionInst.traits).concat(_.flatten(_.values(this.equipment)));
  }

  hasTrait(propertyName) {
    if(this.traitHash[propertyName]) return this.traitHash[propertyName];
    return _.contains(_.pluck(this.getTraits(), 'constructor.name'), `${propertyName}Trait`);
  }

  getTraitValue(property, defaultVal = 0) {
    if(this.traitHash[property]) return this.traitHash[property];
    let properties = this.getTraits();
    let value = _.reduce(properties, ((prev, prop) => prev + (prop[property] ? prop[property]() : defaultVal)), defaultVal);
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

  breakConduct(conduct) {
    this.brokenConduct[conduct] = true;
  }

  loadStartingSkills() {
    const skillCaps = this.professionInst.skillCaps;
    const skillBonus = this.raceInst.skillBonus;
    const defaultLevel = Thresholds.Basic;
    _.each(_.values(Attacks), (atk) => {
      if(!(atk.real.prototype instanceof SkilledAttack)) return;
      let atkName = atk.real.name.toLowerCase();
      let maxLevel = defaultLevel + (skillCaps[atkName] || 0);
      maxLevel = Math.min(maxLevel, Thresholds.Legendary);
      let level = skillBonus[atkName] || 0;
      this.skills[atkName] = new NumberRange(0, SkillThresholds[level].max, SkillThresholds[maxLevel].max);
    });
  }
  
  heal(roll, item) {
    let value = +dice.roll(roll);
    MessageQueue.add({ message: `${this.name} used ${item.name} and regained ${value} health!` });
    this.hp.add(value);
  }
  
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
  
  loadStartingEquipment(list = this.professionInst.startingItems) {
    if(!list) return;
    _.each(list, (item) => {
      if(item.probability && ROT.RNG.getPercentage() > item.probability) return;
      
      let inst = null;
      if(item.choices) {
        let choice = ROT.RNG.getWeightedValue(item.choices);
        inst = item.choicesInit[choice]();
      } else {
        inst = item.init();
      }
      
      this.addToInventory(inst);
    });
  }
  
  dropItem(item) {
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
  
  isEquipped(item) {
    let slot = item.getParentType(); 
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
    let slot = item.getParentType();
    if(!this.equipment[slot]) this.equipment[slot] = [];
    this.equipment[slot].push(item);
    this.breakConduct('stubborn');
    if(this.getType() !== 'Hands') {
      this.breakConduct('nudist');
    }
    this.flushTraits();
  }
  
  getWorseItemsThan(item) {
    let slot = item.getParentType();
    return _(this.equipment[slot]).filter((equip) => equip.value() < item.value() && item.bucName !== 'cursed');
  }
  
  shouldEquip(item) {
    let slot = item.getParentType();
    if(this.raceInst.slots[slot] > 0 && this.canEquip(item)) return true;
    let lowerItems = this.getWorseItemsThan(item);
    return lowerItems.length < item.slotsTaken;
  }
  
  tryEquip(item) {
    if(!this.canEquip(item) || !this.shouldEquip(item)) return false;
    let worseItems = this.getWorseItemsThan(item);
    if(worseItems.length < item.slotsTaken) return false; // cursed items
    
    let slot = item.getParentType();
    if(worseItems.length > 0) {
      for(let i=0; i<item.slotsTaken; i++) {
        this.equipment[slot] = _.without(this.equipment[slot], worseItems[i]);
        this.inventory.push(worseItems[i]);
      }
    }
    this.equip(item);
    return true;
  }
  
  hasFaction(faction) {
    return _.contains(this.factions, faction);
  }
  
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
  
  takeDamage(damage, attacker) {
    this.hp.sub(damage);
    if(this.hp.atMin()) {
      this.die(attacker);
    }
  }
  
  die(killer) {
    this.doBehavior('die');
    MessageQueue.add({ message: `${this.name} was killed by ${killer.name}!` });
    killer.kill(this);
    
    this.killerName = killer.name;
    
    this.game.scheduler.remove(this);
    GameState.world.removeEntity(this);
  }
  
  kill(dead) {
    this.gainXp(dead.killXp);
    this.doBehavior('kill');
  }
  
  stepRandomly() {
    var tiles = GameState.world.getAllTilesInRange(this.x, this.y, this.z, 1);
    var validTiles = _.map(tiles, (tile, i) => GameState.world.isTileEmpty(tile.x, tile.y, tile.z) ? i+1 : null); // 1-9 instead of 0-8
    var direction = _(validTiles).compact().sample() - 1; // adjustment for array
    var newTile = tiles[direction]; // default to a random tile
    
    if(this.lastDirection) {
      let probs = calc(this.lastDirection + 1); // adjust for array
      let choices = _(validTiles).map(tileIndex => tileIndex ? [tileIndex, probs[tileIndex]] : null).compact().zipObject().value();
      direction = parseInt(ROT.RNG.getWeightedValue(choices)) - 1;
      newTile = tiles[direction];
    }
    
    if(!newTile) return; // surrounded
    this.move(newTile);
    this.lastDirection = direction;
  }
  
  stepTowards(target) {
    if(!this.canSee(target)) {
      return this.stepRandomly();
    }
    let path = [];
    let addPath = (x, y) => path.push({ x, y });
    target._path.compute(this.x, this.y, addPath);
    
    path.shift();
    let step = path.shift();
    if(!step) return false;
    
    let blockingEntityInfo = (path) => {
      let entity = null;
      let step = null;
      _.each(path, (step, i) => {
        let testEntity = GameState.world.getEntity(step.x, step.y, this.z);
        if(testEntity && !this.canAttack(testEntity)) {
          entity = testEntity;
          step = i;
          return false;
        }
      });
      return { entity, step };
    };
    
    let mainBlockingInfo = blockingEntityInfo(path);
    
    // the main path is blocked
    if(mainBlockingInfo.entity) {
      let altPath = this.getAlternatePathTo(target);
      
      // no alternate path could be generated
      if(!altPath) {
        this.moveTo(step.x, step.y);
        return true;
      }
      
      let altBlockingInfo = blockingEntityInfo(altPath);

      // both are blocked, take the shortest path
      if(mainBlockingInfo.entity && altBlockingInfo.entity) {
        let newPath = _.min([path, altPath], (testPath) => testPath.length);
        let newStep = newPath.shift();
        this.moveTo(newStep.x, newStep.y);
        
      // the alt path isn't blocked, take that
      } else {
        let newStep = altPath.shift();
        this.moveTo(newStep.x, newStep.y);
      }
      
    // no blockers, keep moving on
    } else {
      this.moveTo(step.x, step.y);
    }
    
    return true;
  }
  
  getAlternatePathTo(target) {
    let canPass = (x, y) => {
      let entity = GameState.world.getEntity(x, y, this.z);
      let isAttackable = entity && this.canAttack(entity);
      let isMe = this.x === x && this.y === y;
      return GameState.world.isTilePassable(x, y, this.z) || isMe || isAttackable;
    };
    let astar = new ROT.Path.AStar(target.x, target.y, canPass);
    
    let path = [];
    astar.compute(this.x, this.y, (x, y) => path.push({ x, y }));
    
    path.shift();
    let step = path.shift();
    if(!step) return null;
    return path;
  }
  
  canAttack(entity) {
    return _.intersection(entity.factions, this.antiFactions).length > 0;
  }
  
  doAttack(attack, hitNum) {
    let target = attack.possibleTargets(this)[0];
    if(!target) return; // possibly a multi-shot attack that has killed early
    attack.use(this, target, hitNum);
  }
  
  tryAttack() {
    let attacks = this.getAttacks();
    if(attacks.length === 0) return false;
    
    _.each(attacks, this.doAttack, this);
    return true;
  }
  
  act() {
    this.currentTurn++;
    this.doBehavior('act');
  }
  
  moveTo(x, y) {
    return GameState.world.moveEntity(this, x, y, this.z);
  }
  
  move(newTile) {
    return GameState.world.moveEntity(this, newTile.x, newTile.y, newTile.z);
  }
  
  calcLevelXp(level) {
    return 10 * Math.pow(2, level);
  }
  
  calcLevelHpBonus() {
    return +dice.roll(this.professionInst.config.hp) + this.calcStatBonus('con');
  }
  
  calcLevelMpBonus() {
    return +dice.roll(this.professionInst.config.mp) + this.calcStatBonus('int');
  }
  
  gainXp(number) {
    this.xp.add(number);
    if(this.xp.atMax()) {
      this.levelup();
    }
  }
  
  getAlign() {
    if(this.align <= -100) return 'Evil';
    if(this.align >= 100) return 'Good';
    return 'Neutral';
  }
  
  levelup() {
    this.professionInst.levelup();
    this.level += 1;
    this.hp.max += this.calcLevelHpBonus();
    this.mp.max += this.calcLevelMpBonus();
    this.xp.max = this.calcLevelXp(this.level);
    
    // resets
    this.xp.cur = 0;
    this.hp.cur = this.hp.max;
    this.mp.cur = this.mp.max;
    
    MessageQueue.add({ message: `${this.name} has reached experience level ${this.level}!` });
  }
  
  rollOrAdd(val) {
    val = _.isString(val) ? +dice.roll(val) : val;
    return !val || _.isNaN(val) ? 0 : val;
  }
  
  getAttacks() {
    let baseAttacks = this.attacks || [];
    let racialAttacks = baseAttacks.concat(this.raceInst.attacks);
    let attacks = racialAttacks.concat(_(this.equipment).values().flatten().filter((item) => item.canUse(this) && item.attacks).pluck('attacks').flatten().value());
    if(attacks.length === 0) attacks = [Attacks.Unarmed()];
    let inventoryAttacks = _(this.inventory).filter((item) => item.canUse(this) && item.attacks).pluck('attacks').flatten().value();
    
    // all melee attacks are valid, but only one ranged inventory attack can be used
    if(_.some(attacks, (atk) => atk.canUse(this))) return attacks;
    return _.compact([_(inventoryAttacks).filter((atk) => atk.canUse(this)).sample()]);
  }

  increaseSkill(type) {
    if(!this.skills[type]) return;
    this.skills[type].add(1);
  }

  getSkillLevel(type) {
    if(!this.skills[type]) return 0;
    let curNum = this.skills[type].cur;
    let level = _.reject(SkillThresholds, threshold => threshold.max < curNum)[0];
    return Thresholds[level.name];
  }
  
  getStat(stat) {
    return this.rollOrAdd(this[stat]) + this.rollOrAdd(this.professionInst[stat]) + this.rollOrAdd(this.raceInst[stat]);
  }

  getStatWithMin(stat, min = 0) {
    return Math.max(min, this.getStat(stat));
  }

  getRegenHp() {
    return this.getStatWithMin('regenHp');
  }

  getRegenMp() {
    return this.getStatWithMin('regenMp');
  }
  
  getBonusDamage() {
    return this.getStat('bonusDamage');
  }
  
  getToHit() {
    return this.getStat('toHit');
  }
  
  getSight() {
    return this.getStatWithMin('sight') + this.getTraitValue('Infravision');
  }
  
  getSpeed() {
    return this.getStatWithMin('speed') + this.getTraitValue('Haste');
  }
  
  getAC() {
    return 10 + this.getStat('ac') - this.calcStatBonus('dex') - this.getTraitValue('Protection');
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
  
  // -2 = 4/5, -1 = 6/7, 0 = 8, +1 = 9/10, +2 = 10/11 (etc)
  calcStatBonus(stat) {
    return Math.floor(this[`get${_.capitalize(stat)}`]() / 2) - 4;
  }
  
  toJSON() {
    let me = _.omit(this, ['game', '_path', 'traitHash', '_attackedBy']);
    return JSON.stringify(me);
  }
}