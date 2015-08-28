
import { Weapon } from '../items';
import Attacks from '../attacks';

export class Dart extends Weapon {
  constructor(opts = { charges: '1d4' }) {
    _.extend(opts, {
      autoRemove: true,
      glyph: { key: ')', fg: '#00f' },
      attacks: [Attacks.Shot({ roll: '1d3', toHit: '0d0', range: 3 })]
    });
    super(opts);
  }
}
Dart.rarity = 50;

export class Arrow extends Weapon {
  constructor(opts = { charges: '1d4' }) {
    _.extend(opts, {
      autoRemove: true,
      glyph: { key: ')', fg: '#f0f' },
      attacks: [Attacks.Shot({ roll: '1d6', toHit: '0d0', range: 6 })]
    });
    super(opts);
  }
}
Arrow.rarity = 25;