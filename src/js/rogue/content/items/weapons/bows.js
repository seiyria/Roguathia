
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';
import { rarity } from '../../../constants/decorators';
import { material, rarity, twoHanded, ranged } from '../../../constants/decorators';

const allArrows = ['orcisharrow', 'arrow', 'elvenarrow'];

@rarity(35)
@material(Materials.Wood)
@twoHanded
@ranged({ ammo: allArrows, damageBoost: '1d1' })
export class OrcishBow extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#f00' },
      attacks: [Attacks.Ranged({ roll: '1d1' })] // if it can't shoot arrows, it'll bash for 1d1
    });
    super(opts);
  }
}

@rarity(25)
@material(Materials.Wood)
@twoHanded
@ranged({ ammo: allArrows, damageBoost: '1d2' })
export class Bow extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#f00' },
      attacks: [Attacks.Ranged({ roll: '1d2' })] // if it can't shoot arrows, it'll bash for 1d2
    });
    super(opts);
  }
}

@rarity(15)
@material(Materials.Wood)
@twoHanded
@ranged({ ammo: allArrows, damageBoost: '1d3' })
export class ElvenBow extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#f00' },
      attacks: [Attacks.Ranged({ roll: '1d3' })] // if it can't shoot arrows, it'll bash for 1d3
    });
    super(opts);
  }
}

@rarity(25)
@material(Materials.Wood)
@twoHanded
@ranged({ ammo: ['bolt'], damageBoost: '1d3' })
export class Crossbow extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#f00' },
      attacks: [Attacks.Ranged({ roll: '1d2' })] // if it can't shoot arrows, it'll bash for 1d2
    });
    super(opts);
  }
}
