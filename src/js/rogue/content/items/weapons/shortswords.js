
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';
import { rarity } from '../../../constants/decorators';

@rarity(25)
export class OrcishShortSword extends Hands {
  get material() { return Materials.Copper; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Slash({ roll: '1d5' })]
    });
    super(opts);
  }
}

@rarity(25)
export class ShortSword extends Hands {
  get material() { return Materials.Iron; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Slash({ roll: '1d6' })]
    });
    super(opts);
  }
}