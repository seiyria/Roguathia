
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';
import { rarity } from '../../../constants/decorators';

@rarity(10)
export class Axe extends Hands {
  get material() { return Materials.Wood; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d6' })]
    });
    super(opts);
  }
}

@rarity(3)
export class BattleAxe extends Hands {
  get material() { return Materials.Wood; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d8 + 1d4' })],
      slotsTaken: 2
    });
    super(opts);
  }
}