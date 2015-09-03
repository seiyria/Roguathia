
import { Item } from './item';
import * as Fakes from '../constants/faketypes';

class Equipment extends Item {
  get name() {
    const name = this.isIdentified() ? this.realName : this.fakeName;
    const enchant = this.enchantment ? `+${this.enchantment} ${name}` : name;
    const buc = this.bucName !== 'uncursed' ? `${this.bucName} ${enchant}` : enchant;
    return buc;
  }
}

export class Special extends Item {}

export class Comestible extends Item {
  constructor(opts = {}) {
    opts.symbol = '%';
    super(opts);
  }
}

export class Armor extends Equipment {}

export class Weapon extends Equipment {
  constructor(opts) {
    super(opts);
    this.realName = this.fakeName = this.getType();
  }
}

export class Body extends Armor {
  constructor(opts) {
    opts.symbol = '[';
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()} armor`;
  }
}
Body.rarity = 10;

export class Ring extends Armor {
  constructor(opts) {
    opts.bucProb = { cursed: 7, blessed: 2, uncursed: 91 };
    opts.symbol = '=';
    super(opts);
    this.realName = `ring of ${this.getCanonName()}`;
    this.fakeName = `${this.pickFakeName(Fakes.Ring)} ring`;
  }
}
Ring.rarity = 3;

export class Hands extends Weapon {
  constructor(opts) {
    opts.symbol = ')';
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()}`;
  }
}
Hands.rarity = 10;

export class Wrist extends Armor {
  constructor(opts) {
    opts.symbol = '[';
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()} gloves`;
  }
}
Wrist.rarity = 10;

export class Feet extends Armor {
  constructor(opts) {
    opts.symbol = '[';
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()} boots`;
    this.slotsTaken = 2;
  }
}
Feet.rarity = 10;

export class Head extends Armor {
  constructor(opts) {
    opts.symbol = '[';
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()} helm`;
  }
}
Head.rarity = 10;

export class Cloak extends Armor {
  constructor(opts) {
    opts.symbol = '[';
    super(opts);
    this.realName = this.fakeName = `ring of ${this.getCanonName()}`;
  }
}
Cloak.rarity = 5;

export class Neck extends Armor {
  constructor(opts) {
    opts.symbol = '"';
    super(opts);
    this.realName = this.fakeName = `amulet of ${this.getCanonName()}`;
  }
}
Neck.rarity = 3;

export class Gem extends Item {
  constructor(opts) {
    opts.symbol = '*';
    super(opts);
    this.realName = this.fakeName = `amulet of ${this.getCanonName()}`;
  }
}
Gem.rarity = 25;

export class Scroll extends Item {
  constructor(opts) {
    opts.symbol = '?';
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()}`;
  }
}
Scroll.rarity = 15;

export class Wand extends Item {
  constructor(opts) {
    opts.symbol = '/';
    super(opts);
    this.realName = this.fakeName = `wand of ${this.getCanonName()}`;
  }
}
Wand.rarity = 2;

export class Spellbook extends Weapon {
  constructor(opts = {}) {
    opts.manaCost = opts.manaCost || 3;
    opts.symbol = '+';
    super(opts);
  }
}
Spellbook.rarity = 1;

export class Potion extends Equipment {
  constructor(opts) {
    opts.symbol = '!';
    super(opts);
    this.realName = `potion of ${this.getCanonName()}`;
    this.fakeName = `${this.pickFakeName(Fakes.Potion)} potion`;
  }
}
Potion.rarity = 15;