
import _ from 'lodash';
import ROT from 'rot-js';
import Roll from '../lib/dice-roller';
import Glyph from './glyph';
import { GetColor } from '../lib/valid-colors';
import GameState from '../init/gamestate';
import Abstract from './abstract';
import Log from '../lib/logger';
import MessageQueue from '../display/message-handler';

export class Item extends Abstract {
  constructor(opts) {
    super(opts);
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
    if(this.charges) this.charges = Roll(this.charges);
    if(this.startIdentified) this.identify();
    this.glyph = new Glyph(opts.glyph.key, opts.glyph.fg);
    this.generateBUC(opts.bucProb);
    if(!this.material) {
      Log('Item', `${this.getType()} has no material set.`);
    }
  }
  
  isIdentified() {
    const myType = this.getParentType();
    return GameState.identification[myType];
  }
  
  identify() {
    const myType = this.getParentType();
    GameState.identification[myType] = this.realName;
  }
  
  pickFakeName(choices) {
    const myType = this.getParentType();
    if(GameState._idMap[this.realName]) {
      return GameState._idMap[this.realName]; // this item has already been generated
    }
    const currentTypes = _.keys(GameState.identification[myType]);
    const validTypes = _.difference(choices, currentTypes);
    const name = _.sample(validTypes);
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
  
  use(owner, extra = { healVal: 0 }) {
    if(this.manaCost) owner.mp.sub(this.manaCost);
    if(this.healRoll) owner.heal(extra.healVal);
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
      const chosenAmmo = _.sample(this.getValidAmmo(owner));
      chosenAmmo._tempAttackBoost = this.range.damageBoost;
      const attack = _.sample(chosenAmmo.attacks);
      owner.doAttack(attack, i);
      delete chosenAmmo._tempAttackBoost;
    }
  }

  disintegrate(owner) {
    owner.unequip(this);
    owner.dropItem(this);
    GameState.world.removeItem(this);
    MessageQueue.add({ message: `${this.name} crumbled to dust.` });
  }

  curse() {
    this.bucName = 'cursed';
    this.setBUC();
  }

  uncurse() {
    this.bucName = 'uncursed';
    this.setBUC();
  }

  bless() {
    this.bucName = 'blessed';
    this.setBUC();
  }

  setBUC() {
    const hash = { cursed: -1, uncursed: 1, blessed: 2 };
    this.buc = hash[this.bucName];
  }
  
  generateBUC(opts = { cursed: 5, blessed: 5, uncursed: 90 }) {
    if(!this.bucName) {
      const status = ROT.RNG.getWeightedValue(opts);
      this.bucName = status;
    }
    this.setBUC();
  }
  
  value() {
    const atkValue = _.reduce(this.attacks, ((prev, cur) => prev + cur.value()), 0);
    return this.buc * (100 - this.rarity) + this.enchantment*5 + atkValue;
  }
  
  toJSON() {
    const me = _.omit(this, ['bucProb', 'startIdentified', '_tempAttackBoost', 'symbol']);
    return JSON.stringify(me);
  }
}