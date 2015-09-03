
import _ from 'lodash';
import { Weapon } from '../../definitions/equipment';
import Attacks from '../attacks/_all';

export class Dart extends Weapon {
  static get rarity() { return 50; }
  constructor(opts = { charges: '1d4' }) {
    _.extend(opts, {
      autoRemove: true,
      glyph: { key: ')', fg: '#00f' },
      attacks: [Attacks.Shot({ roll: '1d3', toHit: '0d0', range: 3 })]
    });
    super(opts);
  }
}

export class Arrow extends Weapon {
  static get rarity() { return 25; }
  constructor(opts = { charges: '1d4' }) {
    _.extend(opts, {
      autoRemove: true,
      glyph: { key: ')', fg: '#f0f' },
      attacks: [Attacks.Shot({ roll: '1d6', toHit: '0d0', range: 6 })]
    });
    super(opts);
  }
}