
import _ from 'lodash';
import { Weapon } from '../../definitions/equipment';
import Attacks from '../attacks/_all';
import Materials from '../../constants/materials';
import { rarity } from '../../constants/decorators';

@rarity(50)
export class Dart extends Weapon {
  get material() { return Materials.Iron; }
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

@rarity(5)
export class Stiletto extends Weapon {
  get material() { return Materials.Iron; }
  constructor(opts = {}) {
    _.extend(opts, {
      autoRemove: true,
      charges: '4d4',
      glyph: { key: ')', fg: '#00f' },
      attacks: [Attacks.Shot({ roll: '1d4', toHit: '0d0', range: 4 })]
    });
    super(opts);
  }
}

@rarity(25)
export class OrcishArrow extends Weapon {
  get material() { return Materials.Wood; }
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

@rarity(20)
export class Arrow extends Weapon {
  get material() { return Materials.Wood; }
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

@rarity(15)
export class ElvenArrow extends Weapon {
  get material() { return Materials.Iron; }
  constructor(opts = {}) {
    _.extend(opts, {
      autoRemove: true,
      charges: '2d4',
      glyph: { key: ')', fg: '#f0f' },
      attacks: [Attacks.Shot({ roll: '1d8', toHit: '1d1', range: 7 })]
    });
    super(opts);
  }
}

@rarity(25)
export class Bolt extends Weapon {
  get material() { return Materials.Wood; }
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