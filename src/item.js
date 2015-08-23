import Glyph from "./glyph";
import GameState from "./gamestate";

export class Item {
  constructor(opts) {
    this.glyph = new Glyph(opts.glyph.key, opts.glyph.fg);
    this.enchantment = opts.enchantment || 0;
    this.slotsTaken = opts.slotsTaken || 1;
    if(opts.attacks) {
      this.attacks = opts.attacks;
      _.each(this.attacks, (attack) => attack._itemRef = this);
    }
    this.generateBUC(opts.buc);
  }
  
  isIdentified() {
    let myType = this.getParentType();
    return GameState.identification[myType];
  }
  
  getType() {
    return this.constructor.name;
  }
  
  getParentType() {
    return Object.getPrototypeOf(Object.getPrototypeOf(this)).constructor.name.toLowerCase();
  }
  
  determineName() {
    return GameState.identification[myType] ? this.realName : this.fakeName;
  }
  
  pickFakeName(choices) {
    let myType = this.getParentType();
    let currentTypes = _.keys(GameState.identification[myType]);
    let validTypes = _.difference(choices, currentTypes);
    return _.sample(validTypes);
  }
  
  generateBUC(opts = { cursed: 5, blessed: 5, uncursed: 90 }) {
    let status = ROT.RNG.getWeightedValue(opts);
    let hash = { cursed: -1, uncursed: 1, blessed: 2 };
    this.buc = hash[status];
  }
  
  use(owner, target) {
  }
  
  canUse(owner) {
    return owner.isEquipped(this);
  }
  
  value() {
    return this.buc * (100 - this.rarity - this.enchantment*5);
  }
  
  identify() {
    let myType = this.getParentType();
    GameState.identification[myType] = this.realName;
  }
}