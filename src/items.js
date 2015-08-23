
import {Item} from "./item";
import GameState from "./gamestate";
import {GetColor} from "./lib/valid-colors";

class Equipment extends Item {
  get name() {
    let name = this.isIdentified() ? this.realName : this.fakeName;
    return this.enchantment ? `+${this.enchantment} ${name}` : name;
  }
}

class Armor extends Equipment {}
export class Weapon extends Equipment {
  constructor(opts) {
    super(opts);
    if(opts.manaCost) this.manaCost = opts.manaCost;
    if(opts.charges) this.charges = +dice.roll(opts.charges);
    if(opts.autoRemove) this.autoRemove = opts.autoRemove;
  }
  
  canUse(owner) {
    if(this.manaCost) return owner.mp.gte(this.manaCost);
    if(this.charges) return this.charges > 0;
    return owner.isEquipped(this);
  }
  
  use(owner) {
    if(this.manaCost) owner.mp.sub(this.manaCost);
    if(this.charges) {
      this.charges--;
      if(this.charges <= 0 && this.autoRemove) owner.removeFromInventory(this);
    }
  }
}

let ringFakeTypes = ['pearl', 'iron', 'twisted', 'steel', 'wire', 'engagement', 'shiny', 'bronze', 'brass', 'copper', 'silver', 'gold', 'wooden', 'granite', 'opal', 'clay', 'coral', 'black onyx', 'moonstone', 'tiger eye', 'jade', 'agate', 'topaz', 'sapphire', 'ruby', 'diamond', 'ivory', 'emerald'];
export class Ring extends Armor {
  constructor(opts) {
    opts.buc = { cursed: 7, blessed: 2, uncursed: 91 };
    opts.glyph = {key: '=', fg: GetColor()};
    super(opts);
    this.realName = `ring of ${_.startCase(this.constructor.name).toLowerCase()}`;
    this.fakeName = `${this.pickFakeName(ringFakeTypes)} ring`;
  }
}
Ring.rarity = 3;

export class Hands extends Weapon {}
export class Wrist extends Armor {}
export class Feet extends Armor {}
export class Head extends Armor {}
export class Body extends Armor {}
export class Cloak extends Armor {}
export class Neck extends Armor {}

export class Special extends Item {}

class Gem extends Item {}
class Scroll extends Item {}
class Wand extends Item {}
class Spellbook extends Item{}

export class Comestible extends Item {
  constructor(opts) {
    opts.glyph = {key: '%', fg: GetColor()};
    super(opts);
  }
}
class Potion extends Comestible {}

//import * as Rings from "./items/rings";
//export default { Rings };