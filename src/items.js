
import {Item} from "./item";
import GameState from "./gamestate";
import {GetColor} from "./lib/valid-colors";

export class Special extends Item {}

export class Comestible extends Item {
  constructor(opts = {}) {
    if(!opts.glyph) opts.glyph = {key: '%', fg: GetColor()};
    super(opts);
  }
}

class Equipment extends Item {
  get name() {
    let name = this.isIdentified() ? this.realName : this.fakeName;
    let enchant = this.enchantment ? `+${this.enchantment} ${name}` : name;
    let buc = this.bucName !== 'uncursed' ? `${this.bucName} ${enchant}` : enchant;
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

export class Hands extends Weapon {
  constructor() {
    opts.glyph = _.extend({key: ')', fg: GetColor()}, opts.glyph);
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()}`;
  }
}
Hands.rarity = 10;

export class Wrist extends Armor {
  constructor() {
    opts.glyph = _.extend({key: '[', fg: GetColor()}, opts.glyph);
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()} gloves`;
  }
}
Wrist.rarity = 10;

export class Feet extends Armor {
  constructor() {
    opts.glyph = _.extend({key: '[', fg: GetColor()}, opts.glyph);
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()} boots`;
    this.slotsTaken = 2;
  }
}
Feet.rarity = 10;

export class Head extends Armor {
  constructor() {
    opts.glyph = _.extend({key: '[', fg: GetColor()}, opts.glyph);
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()} helm`;
  }
}
Head.rarity = 10;

export class Body extends Armor {
  constructor() {
    opts.glyph = _.extend({key: '[', fg: GetColor()}, opts.glyph);
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()} armor`;
  }
}
Body.rarity = 10;

export class Cloak extends Armor {
  constructor() {
    opts.glyph = _.extend({key: '[', fg: GetColor()}, opts.glyph);
    super(opts);
    this.realName = this.fakeName = `ring of ${this.getCanonName()}`;
  }
}
Cloak.rarity = 5;

export class Neck extends Armor {
  constructor() {
    opts.glyph = _.extend({key: '"', fg: GetColor()}, opts.glyph);
    super(opts);
    this.realName = this.fakeName = `amulet of ${this.getCanonName()}`;
  }
}
Neck.rarity = 3;

class Gem extends Item {
  constructor() {
    opts.glyph = _.extend({key: '*', fg: GetColor()}, opts.glyph);
    super(opts);
    this.realName = this.fakeName = `amulet of ${this.getCanonName()}`;
  }
}
Gem.rarity = 25;

class Scroll extends Item {
  constructor() {
    opts.glyph = _.extend({key: '?', fg: GetColor()}, opts.glyph);
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()}`;
  }
}
Scroll.rarity = 15;

class Wand extends Item {
  constructor() {
    opts.glyph = _.extend({key: '/', fg: GetColor()}, opts.glyph);
    super(opts);
    this.realName = this.fakeName = `wand of ${this.getCanonName()}`;
  }
}
Wand.rarity = 2;

export class Spellbook extends Weapon {
  constructor(opts = {}) {
    opts.manaCost = opts.manaCost || 3;
    opts.glyph = {key: '+', fg: '#f0f'};
    super(opts);
  }
}
Spellbook.rarity = 1;

let potionFakeTypes = ['ruby', 'dark green', 'purple-red', 'smoky', 'brown', 'pink', 'cyan', 'puce', 'cloudy', 'fizzy', 'orange', 'sky blue', 'milky', 'effervescent', 'dark', 'yellow', 'brilliant blue', 'swirly', 'black', 'white', 'emerald', 'magenta', 'bubbly', 'golden', 'murky'];
export class Potion extends Equipment {
  constructor(opts) {
    opts.glyph = {key: '!', fg: GetColor()};
    super(opts);
    this.realName = `potion of ${this.getCanonName()}`;
    this.fakeName = `${this.pickFakeName(potionFakeTypes)} potion`;
  }
}
Potion.rarity = 15;

//import * as Rings from "./items/rings";
//export default { Rings };