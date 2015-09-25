
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';
import { rarity } from '../../../constants/decorators';

@rarity(25)
export class Quarterstaff extends Hands {
  get material() { return Materials.Wood; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#49311c' },
      attacks: [Attacks.Bash({ roll: '1d6' })],
      slotsTaken: 2
    });
    super(opts);
  }
}
