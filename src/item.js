import Glyph from "./glyph";
import GameState from "./gamestate";

export class Item {
  constructor(opts) {
    _.extend(this, opts);
    this.enchantment = this.enchantment || 0;
    this.slotsTaken = this.slotsTaken || 1;
    if(this.attacks) {
      _.each(this.attacks, (attack) => attack._itemRef = this);
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
      return GameState._idMap[this.realName]; //this item has already been generated
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
  
  use(owner) {
    if(this.manaCost) owner.mp.sub(this.manaCost);
    if(this.healRoll) owner.heal(this.healRoll, this);
    if(this.charges) {
      this.charges--;
      if(this.charges <= 0 && this.autoRemove) owner.removeFromInventory(this);
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
    let me = _.omit(this, ['bucProb', 'startIdentified']);
    return JSON.stringify(me);
  }
}