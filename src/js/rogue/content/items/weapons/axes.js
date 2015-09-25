
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';

export class Axe extends Hands {
  get material() { return Materials.Wood; }
  static get rarity() { return 10; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d6' })]
    });
    super(opts);
  }
}

export class BattleAxe extends Hands {
  get material() { return Materials.Wood; }
  static get rarity() { return 3; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d8 + 1d4' })],
      slotsTaken: 2
    });
    super(opts);
  }
}