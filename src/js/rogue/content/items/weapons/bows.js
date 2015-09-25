
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';

const allArrows = ['orcisharrow', 'arrow', 'elvenarrow'];

export class OrcishBow extends Hands {
  get material() { return Materials.Wood; }
  static get rarity() { return 35; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#f00' },
      attacks: [Attacks.Ranged({ roll: '1d1' })], // if it can't shoot arrows, it'll bash for 1d2
      slotsTaken: 2,
      range: {
        ammo: allArrows,
        damageBoost: '1d1'
      }
    });
    super(opts);
  }
}

export class Bow extends Hands {
  get material() { return Materials.Wood; }
  static get rarity() { return 25; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#f00' },
      attacks: [Attacks.Ranged({ roll: '1d2' })], // if it can't shoot arrows, it'll bash for 1d2
      slotsTaken: 2,
      range: {
        ammo: allArrows,
        damageBoost: '1d2'
      }
    });
    super(opts);
  }
}

export class ElvenBow extends Hands {
  get material() { return Materials.Wood; }
  static get rarity() { return 15; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#f00' },
      attacks: [Attacks.Ranged({ roll: '1d3' })], // if it can't shoot arrows, it'll bash for 1d2
      slotsTaken: 2,
      range: {
        ammo: allArrows,
        damageBoost: '1d3'
      }
    });
    super(opts);
  }
}


export class Crossbow extends Hands {
  get material() { return Materials.Wood; }
  static get rarity() { return 25; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#f00' },
      attacks: [Attacks.Ranged({ roll: '1d2' })], // if it can't shoot arrows, it'll bash for 1d2
      slotsTaken: 2,
      range: {
        ammo: ['bolt'],
        damageBoost: '1d3'
      }
    });
    super(opts);
  }
}
