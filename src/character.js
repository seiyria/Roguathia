
import Entity from "./entity";
import NumberRange from "./lib/number-range";
import * as Professions from "./profession";
import GameState from "./gamestate";
import * as Attacks from "./attacks";

import loadValue from './lib/value-assign';

let defaultAttributes = {
  ac:  0,
  str: 7,
  con: 7,
  dex: 7,
  int: 7,
  wis: 7,
  cha: 7,
  luk: 0,
  gold: 0,
  level: 1,
  align: 0, 
  speed: 100, 
  sight: 7,
  killXp: 0,
  spawnHp: 15,
  spawnMp: 0,
  regenHp: 20,
  regenMp: 10
};

let defaultStats = { 
  gender: 'None', 
  name: 'Dudley',
  attacks: [],
  behaviors: [],
  profession: 'Tourist' 
};

export default class Character extends Entity {
  
  constructor(glyph, x, y, z, opts = {stats: {}, attributes: {}}) {
    super(glyph, x, y, z);
    this.currentTurn = 0;
    _.extend(this, defaultAttributes, opts.attributes, loadValue);
    _.extend(this, defaultStats, opts.stats);
    
    this.behaviors = _.sortBy(this.behaviors, 'priority');
    
    this.professionInst = new Professions[this.profession]();
    let [profHp, profMp] = [this.professionInst.hp, this.professionInst.mp];
    this.hp = new NumberRange(0, this.spawnHp+profHp, this.spawnHp+profHp);
    this.mp = new NumberRange(0, this.spawnMp+profMp, this.spawnMp+profMp);
    this.xp = new NumberRange(0, 0, this.calcLevelXp(this.level));
    this.gold += this.professionInst.gold;
    this.equipment = [];
    
    GameState.world.moveEntity(this, this.x, this.y, this.z);
    
    this.game = GameState.game;
    this.game.scheduler.add(this, true);
  }
  
  doBehavior(action, args = []) {
    args.unshift(this);
    _.each(this.behaviors, (behavior) => {if(behavior[action]) return behavior[action].apply(this, args)}); // returning false from any behavior will cancel subsequent ones
  }
  
  takeDamage(damage) {
    this.hp.sub(damage);
    if(this.hp.atMin()) {
      this.die();
    }
  }
  
  die() {
    this.doBehavior('die');
    this.game.scheduler.remove(this);
    GameState.world.removeEntity(this);
  }
  
  tryMove() {}
  
  canAttack(entity) {
    return entity.constructor.name === 'Monster';
  }
  
  tryAttack() {
    let attacks = this.getAttacks();
    attacks = _.filter(attacks, (atk) => atk.canUse(this));
    if(attacks.length === 0) return;
    
    _.each(attacks, (attack) => {
      let target = attack.possibleTargets(this)[0];
      attack.tryHit(this, target);
    });
  }
  
  act() {
    this.currentTurn++;
    if(this.currentTurn % this.regenHp === 0) this.hp.add(1);
    if(this.currentTurn % this.regenMp === 0) this.mp.add(1);
    this.doBehavior('act');
  }
  
  attack(entity, attacks) {
    
  }
  
  moveTo(x, y) {
    GameState.world.moveEntity(this, x, y, this.z);
  }
  
  move(newTile) {
    GameState.world.moveEntity(this, newTile.x, newTile.y, newTile.z);
  }
  
  calcLevelXp(level) {
    return 10 * Math.pow(level, 2);
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
    this.level++;
    this.hp.max += +roll(this.professionInst.hp);
    this.mp.max += +roll(this.professionInst.mp);
    this.xp.max *= 2;
    this.xp.cur = 0;
  }
  
  getAttacks() {
    return [Attacks.Fist('1d4')];
  }
  
  getStat(stat) {
    return this[stat] + this.professionInst[stat];
  }
  
  getSight() {
    return this.getStat('sight');
  }
  
  getSpeed() {
    return this.getStat('speed');
  }
  
  getAC() {
    return 10 + this.getStat('ac');
  }
  
  getStr() {
    return this.getStat('str');
  }
  
  getDex() {
    return this.getStat('dex');
  }
  
  getCon() {
    return this.getStat('con');
  }
  
  getInt() {
    return this.getStat('int');
  }
  
  getWis() {
    return this.getStat('wis');
  }
  
  getCha() {
    return this.getStat('cha');
  }
  
  getLuk() {
    return this.getStat('luk');
  }
  
  // -2 = 4/5, -1 = 6/7, 0 = 8, +1 = 9/10, +2 = 10/11 (etc)
  calcStatBonus(stat) {
    return Math.floor(this[`get${_.capitalize(stat)}`]() / 2) - 4;
  }
  
  
  toJSON() {
    let me = _.omit(this, 'game');
    return JSON.stringify(me);
  }
}