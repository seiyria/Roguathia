
import _ from 'lodash';
import { Weapon } from '../../definitions/equipment';
import Attacks from '../attacks/_all';

export class Dart extends Weapon {
  static get rarity() { return 50; }
  constructor(opts = {}) {
    _.extend(opts, {
      autoRemove: true,
      charges: '2d4',
      glyph: { key: ')', fg: '#00f' },
      attacks: [Attacks.Shot({ roll: '1d3', toHit: '0d0', range: 3 })]
    });
    super(opts);
  }
}

export class OrcishArrow extends Weapon {
  static get rarity() { return 25; }
  constructor(opts = {}) {
    _.extend(opts, {
      autoRemove: true,
      charges: '1d4',
      glyph: { key: ')', fg: '#f0f' },
      attacks: [Attacks.Shot({ roll: '1d5', toHit: '0d0', range: 5 })]
    });
    super(opts);
  }
}

export class Arrow extends Weapon {
  static get rarity() { return 20; }
  constructor(opts = {}) {
    _.extend(opts, {
      autoRemove: true,
      charges: '1d4',
      glyph: { key: ')', fg: '#f0f' },
      attacks: [Attacks.Shot({ roll: '1d6', toHit: '0d0', range: 6 })]
    });
    super(opts);
  }
}

export class Bolt extends Weapon {
  static get rarity() { return 25; }
  constructor(opts = {}) {
    _.extend(opts, {
      autoRemove: true,
      charges: '1d4',
      glyph: { key: ')', fg: '#f0f' },
      attacks: [Attacks.Shot({ roll: '1d8', toHit: '0d0', range: 4 })]
    });
    super(opts);
  }
}