
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';
import { material, rarity } from '../../../constants/decorators';

@rarity(35)
@material(Materials.Copper)
export class OrcishDagger extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d3' })]
    });
    super(opts);
  }
}

@rarity(25)
@material(Materials.Iron)
export class Dagger extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Stab({ roll: '1d4' })]
    });
    super(opts);
  }
}

@rarity(15)
@material(Materials.Silver)
export class SilverDagger extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Stab({ roll: '1d5' })]
    });
    super(opts);
  }
}

@rarity(15)
@material(Materials.Wood)
export class ElvenDagger extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Stab({ roll: '1d7' })]
    });
    super(opts);
  }
}

@rarity(5)
@material(Materials.Mineral)
export class Crysknife extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Stab({ roll: '1d10' })]
    });
    super(opts);
  }
}