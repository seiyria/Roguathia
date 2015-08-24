
import {Item} from "./item";
import GameState from "./gamestate";
import {GetColor} from "./lib/valid-colors";

class Equipment extends Item {
  get name() {
    let name = this.isIdentified() ? this.realName : this.fakeName;
    let enchant = this.enchantment ? `+${this.enchantment} ${name}` : name;
    let buc = this.bucName !== 'uncursed' ? `${this.bucName} ${enchant}` : enchant
    return buc;
  }
}

class Armor extends Equipment {}
export class Weapon extends Equipment {
  constructor(opts) {
    super(opts);
    this.realName = this.fakeName = this.getType();
  }
}

//TODO abstract these (and other fake types) to a seperate module
let ringFakeTypes = ['pearl', 'iron', 'twisted', 'steel', 'wire', 'engagement', 'shiny', 'bronze', 'brass', 'copper', 'silver', 'gold', 'wooden', 'granite', 'opal', 'clay', 'coral', 'black onyx', 'moonstone', 'tiger eye', 'jade', 'agate', 'topaz', 'sapphire', 'ruby', 'diamond', 'ivory', 'emerald'];
export class Ring extends Armor {
  constructor(opts) {
    opts.bucProb = { cursed: 7, blessed: 2, uncursed: 91 };
    opts.glyph = {key: '=', fg: GetColor()};
    super(opts);
    this.realName = `ring of ${this.getCanonName()}`;
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
class Spellbook extends Item {}

export class Comestible extends Item {
  constructor(opts) {
    if(!opts.glyph) opts.glyph = {key: '%', fg: GetColor()};
    super(opts);
  }
}

let potionFakeTypes = ['ruby', 'dark green', 'purple-red', 'smoky', 'brown', 'pink', 'cyan', 'puce', 'cloudy', 'fizzy', 'orange', 'sky blue', 'milky', 'effervescent', 'dark', 'yellow', 'brilliant blue', 'swirly', 'black', 'white', 'emerald', 'magenta', 'bubbly', 'golden', 'murky'];
export class Potion extends Equipment {
  constructor(opts) {
    opts.glyph = {key: '!', fg: GetColor()};
    super(opts);
    this.realName = `potion of ${this.getCanonName()}`;
    this.fakeName = `${this.pickFakeName(potionFakeTypes)} potion`;
  }
}

//import * as Rings from "./items/rings";
//export default { Rings };