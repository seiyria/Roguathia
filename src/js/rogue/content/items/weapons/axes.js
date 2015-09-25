
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';
import { material, rarity, twoHanded } from '../../../constants/decorators';

@rarity(10)
@material(Materials.Wood)
export class Axe extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d6' })]
    });
    super(opts);
  }
}

@rarity(3)
@material(Materials.Wood)
@twoHanded
export class BattleAxe extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d8 + 1d4' })]
    });
    super(opts);
  }
}

@rarity(1)
@material(Materials.Wood)
export class DwarvishMattock extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d12 + 1d4' })]
    });
    super(opts);
  }
}