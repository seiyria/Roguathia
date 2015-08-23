
//extending Weapon means an item is not equippable but is a weapon.
//etending Hands means an item is equippable in the hands slot
import {Weapon, Hands} from "../items";
import Attacks from "../attacks";

export class Dart extends Weapon {
  constructor(opts) {
    opts.glyph = {key: ')', fg: '#00f'};
    opts.attacks = [Attacks.Shot('1d3', '0d0', 6)];
    super(opts);
  }
}

export class Dagger extends Hands {
  constructor(opts = {}) {
    opts.glyph = {key: ')', fg: '#ccc'};
    opts.attacks = [Attacks.Slash('1d4')];
    super(opts);
  }
}