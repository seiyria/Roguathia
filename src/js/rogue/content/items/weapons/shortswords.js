
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';

export class OrcishShortSword extends Hands {
  get material() { return Materials.Copper; }
  static get rarity() { return 35; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Slash({ roll: '1d5' })]
    });
    super(opts);
  }
}

export class ShortSword extends Hands {
  get material() { return Materials.Iron; }
  static get rarity() { return 25; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Slash({ roll: '1d6' })]
    });
    super(opts);
  }
}