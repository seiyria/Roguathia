
//extending Weapon means an item is not equippable but is a weapon.
//etending Hands means an item is equippable in the hands slot
import {Weapon, Hands} from "../items";
import Attacks from "../attacks";

export class Dart extends Weapon {
  constructor(opts = {charges: '1d4'}) {
    _.extend(opts, {
      autoRemove: true,
      glyph: {key: ')', fg: '#00f'},
      attacks: [Attacks.Shot('1d3', '0d0', 3)]
    });
    super(opts);
  }
}

export class Arrow extends Weapon {
  constructor(opts = {charges: '1d4'}) {
    _.extend(opts, {
      autoRemove: true,
      glyph: {key: ')', fg: '#f0f'},
      attacks: [Attacks.Shot('1d6', '0d0', 6)]
    });
    super(opts);
  }
}

export class Bow extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: {key: ')', fg: '#f00'},
      attacks: [Attacks.Ranged('1d2')], //if it can't shoot arrows, it'll bash for 1d2
      slotsTaken: 2,
      range: {
        ammo: ['arrow', 'dart'],
        damageBoost: '1d2'
      }
    });
    super(opts);
  }
}

export class Dagger extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: {key: ')', fg: '#ccc'},
      attacks: [Attacks.Slash('1d4')]
    });
    super(opts);
  }
}