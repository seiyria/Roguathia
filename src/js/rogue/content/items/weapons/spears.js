
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';
import { rarity } from '../../../constants/decorators';

@rarity(35)
export class OrcishSpear extends Hands {
  get material() { return Materials.Wood; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d5' })]
    });
    super(opts);
  }
}

@rarity(25)
export class Spear extends Hands {
  get material() { return Materials.Wood; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Stab({ roll: '1d6' })]
    });
    super(opts);
  }
}

@rarity(1)
export class Trident extends Hands {
  get material() { return Materials.Wood; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Stab({ roll: '2d6 + 1' })]
    });
    super(opts);
  }

  LizardBane() { return 2; }
  LizardFury() { return 1; }
}