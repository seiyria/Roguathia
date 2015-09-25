
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';

export class Quarterstaff extends Hands {
  get material() { return Materials.Wood; }
  static get rarity() { return 25; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#49311c' },
      attacks: [Attacks.Bash({ roll: '1d6' })],
      slotsTaken: 2
    });
    super(opts);
  }
}
