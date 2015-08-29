import Glyph from './glyph';
import { GetColor } from '../lib/valid-colors';
import GameState from '../init/gamestate';

export class Item {
  constructor(opts) {
    opts.glyph = _.extend({ fg: GetColor(), key: opts.symbol }, opts.glyph);
    _.extend(this, opts);
    this.enchantment = this.enchantment || 0;
    this.slotsTaken = this.slotsTaken || 1;
    if(this.attacks) {
      _.each(this.attacks, (attack) => attack._itemRef = this);
    }
    if(this.range) {
      this.range = _.extend({ numShots: 1, damageBoost: '0d0', ammo: [] }, this.range);
    }
    if(this.charges) this.charges = +dice.roll(this.charges);
    if(this.startIdentified) this.identify();
    this.glyph = new Glyph(opts.glyph.key, opts.glyph.fg);
    this.generateBUC(opts.bucProb);
  }
  
  isIdentified() {
    let myType = this.getParentType();
    return GameState.identification[myType];
  }
  
  identify() {
    let myType = this.getParentType();
    GameState.identification[myType] = this.realName;
  }
  
  pickFakeName(choices) {
    let myType = this.getParentType();
    if(GameState._idMap[this.realName]) {
      return GameState._idMap[this.realName]; // this item has already been generated
    }
    let currentTypes = _.keys(GameState.identification[myType]);
    let validTypes = _.difference(choices, currentTypes);
    let name = _.sample(validTypes);
    GameState._idMap[this.realName] = name;
    return name;
  }
  
  canUse(owner) {
    if(this.manaCost) return owner.mp.gte(this.manaCost);
    if(this.charges) return this.charges > 0;
    return owner.isEquipped(this);
  }
  
  hasValidAmmo(owner) {
    return this.getValidAmmo(owner).length > 0;
  }
  
  getValidAmmo(owner) {
    return _.filter(owner.inventory, (item) => item.canUse(owner) && _.contains(this.range.ammo, item.getType()));
  }
  
  use(owner) {
    if(this.manaCost) owner.mp.sub(this.manaCost);
    if(this.healRoll) owner.heal(this.healRoll, this);
    if(this.charges) {
      this.charges--;
      if(this.charges <= 0 && this.autoRemove) owner.removeFromInventory(this);
    }
    if(this.range && this.hasValidAmmo(owner)) {
      this.pewpew(owner);  
    }
  }
  
  pewpew(owner) {
    for(let i=0; i<this.range.numShots; i++) {
      let chosenAmmo = _.sample(this.getValidAmmo(owner));
      chosenAmmo._tempAttackBoost = this.range.damageBoost;
      let attack = _.sample(chosenAmmo.attacks);
      owner.doAttack(attack, i);
      delete chosenAmmo._tempAttackBoost;
    }
  }
  
  getCanonName() {
    return _.startCase(this.constructor.name).toLowerCase();
  }
  
  getType() {
    return this.constructor.name.toLowerCase();
  }
  
  getParentType() {
    return Object.getPrototypeOf(Object.getPrototypeOf(this)).constructor.name.toLowerCase();
  }
  
  generateBUC(opts = { cursed: 5, blessed: 5, uncursed: 90 }) {
    if(!this.bucName) {
      let status = ROT.RNG.getWeightedValue(opts);
      this.bucName = status;
    }
    let hash = { cursed: -1, uncursed: 1, blessed: 2 };
    this.buc = hash[this.bucName];
  }
  
  value() {
    let atkValue = _.reduce(this.attacks, ((prev, cur) => prev + cur.value()), 0);
    return this.buc * (100 - this.rarity) + this.enchantment*5 + atkValue;
  }
  
  toJSON() {
    let me = _.omit(this, ['bucProb', 'startIdentified', '_tempAttackBoost', 'symbol']);
    return JSON.stringify(me);
  }
}